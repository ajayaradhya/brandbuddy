from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters

from core.filters import CollaborationFilter
from drf_yasg.utils import swagger_auto_schema
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
