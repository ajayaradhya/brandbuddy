from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from core.filters import CollaborationFilter
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import date
from drf_yasg import openapi
from .models import Brand, Collaboration
from .serializers import BrandSerializer, CollaborationSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by('-created_at')
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # Allow searching brands by name


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
