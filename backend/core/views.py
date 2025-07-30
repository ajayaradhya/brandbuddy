from datetime import date, datetime

from core.filters import CollaborationFilter
from core.models import Brand, Collaboration
from django.db.models import Count, ExpressionWrapper, F, FloatField, Sum
from django.db.models.functions import Coalesce, TruncMonth
from django.utils import timezone
from django.utils.timezone import localtime, now
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Brand, Collaboration
from .serializers import BrandSerializer, CollaborationSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by('-created_at')
    serializer_class = BrandSerializer
    permission_classes = []  # Add [IsAuthenticated] if you need auth
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Enable filters and search
    filterset_fields = ['status', 'category']  # Use for dropdown filters on frontend
    search_fields = ['name', 'instagram_handle', 'email']  # Free text search
    ordering_fields = ['created_at', 'name']  # Enable sorting
    ordering = ['-created_at']


class CollaborationViewSet(viewsets.ModelViewSet):
    queryset = Collaboration.objects.all().select_related('brand')
    serializer_class = CollaborationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CollaborationFilter

    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('pitch_date__gte', openapi.IN_QUERY, description="Pitch date ≥ (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('pitch_date__lte', openapi.IN_QUERY, description="Pitch date ≤ (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('followup_date__gte', openapi.IN_QUERY, description="Follow-up date ≥ (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('followup_date__lte', openapi.IN_QUERY, description="Follow-up date ≤ (YYYY-MM-DD)", type=openapi.TYPE_STRING, format=openapi.FORMAT_DATE),
        openapi.Parameter('status', openapi.IN_QUERY, description="Collaboration status", type=openapi.TYPE_STRING),
        openapi.Parameter('platform', openapi.IN_QUERY, description="Platform (instagram/youtube/both)", type=openapi.TYPE_STRING),
        openapi.Parameter('collab_type', openapi.IN_QUERY, description="Type (barter/paid/etc.)", type=openapi.TYPE_STRING),
    ])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description="Get collaborations with overdue follow-ups (followup_date < today and not closed/completed)."
    )
    @action(detail=False, methods=["get"], url_path="overdue-followups")
    def overdue_followups(self, request):
        today = date.today()
        overdue_qs = self.get_queryset().filter(
            followup_date__lt=today,
        ).exclude(
            status__in=["delivered", "paid"]
        )

        page = self.paginate_queryset(overdue_qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(overdue_qs, many=True)
        return Response(serializer.data)


class CalendarViewAPI(APIView):
    def get(self, request):
        events = []
        collabs = Collaboration.objects.select_related('brand').all()

        def format_date(d):
            if isinstance(d, datetime):
                return localtime(d).date()
            return d  # assume already a date

        for c in collabs:
            if c.start_date:
                events.append({
                    "title": f"{c.brand.name} - Collab Starts",
                    "date": format_date(c.start_date),
                    "type": "collaboration_start",
                })
            if c.end_date:
                events.append({
                    "title": f"{c.brand.name} - Collab Ends",
                    "date": format_date(c.end_date),
                    "type": "collaboration_end",
                })
            if c.followup_date:
                events.append({
                    "title": f"{c.brand.name} - Follow Up",
                    "date": format_date(c.followup_date),
                    "type": "followup",
                })
            if c.delivery_deadline:
                events.append({
                    "title": f"{c.brand.name} - Delivery Deadline",
                    "date": format_date(c.delivery_deadline),
                    "type": "delivery_deadline",
                })

        return Response({"events": events})


@api_view(['GET'])
def dashboard_view(request):
    today = now().date()

    # Total counts
    total_brands = Brand.objects.count()
    total_collabs = Collaboration.objects.count()

    # Collabs by status
    status_counts = Collaboration.objects.values('status').annotate(count=Count('id')).order_by('status')

    # Collabs by type
    type_counts = Collaboration.objects.values('collab_type').annotate(count=Count('id')).order_by('collab_type')

    # Monthly collaborations since 6 months
    six_months_ago = today - timezone.timedelta(days=180)
    monthly_data = (
        Collaboration.objects.filter(created_at__gte=six_months_ago)
        .annotate(month=TruncMonth('created_at'))
        .values('month')
        .annotate(count=Count('id'), total_amount=Sum('amount'))
        .order_by('month')
    )

    # Overdue followups
    overdue_followups = Collaboration.objects.filter(
        followup_date__lt=today
    ).exclude(
        status__in=["delivered", "paid"]
    ).count()

    # upcoming deliveries
    upcoming_deliveries = Collaboration.objects.filter(
        delivery_deadline__gte=today
    ).exclude(
        status__in=["delivered", "paid"]
    ).count()

    # Total paid amount
    total_paid_amount = Collaboration.objects.filter(status='paid').aggregate(Sum('amount'))['amount__sum'] or 0

    # Total barter value
    total_barter_value = Collaboration.objects.filter(collab_type='barter').aggregate(Sum('barter_value'))['barter_value__sum'] or 0

    # Top performing brands by total paid + barter value
    top_brands_qs = (
        Collaboration.objects
        .values('brand__name')  # Group by brand name
        .annotate(
            total_collabs=Count('id'),
            total_paid=Sum('amount'),
            total_barter=Sum('barter_value'),
            total_value=ExpressionWrapper(
                Coalesce(Sum('amount'), 0) + Coalesce(Sum('barter_value'), 0),
                output_field=FloatField()
            )
        )
        .order_by('-total_value')[:3]
    )

    top_brands = [
        {
            "name": brand["brand__name"],
            "total_collabs": brand["total_collabs"],
            "total_paid": round(brand["total_paid"] or 0, 2),
            "total_barter": round(brand["total_barter"] or 0, 2),
            "total_value": round(brand["total_value"] or 0, 2),
        }
        for brand in top_brands_qs
    ]

    return Response({
        'total_brands': total_brands,
        'total_collabs': total_collabs,
        'status_counts': {item['status']: item['count'] for item in status_counts},
        'type_counts': {item['collab_type']: item['count'] for item in  type_counts},
        'monthly_data': [       {
            'month': item['month'].strftime('%Y-%m'),
            'count': item['count'],
            'total_amount': item['total_amount'] or 0,
        } for item in monthly_data],
        'overdue_followups': overdue_followups,
        'upcoming_deliveries': upcoming_deliveries,
        'total_paid_amount': total_paid_amount,
        'total_barter_value': total_barter_value,
        "top_brands": top_brands,
    })
