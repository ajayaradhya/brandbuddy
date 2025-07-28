from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from .models import Brand, Collaboration
from .serializers import BrandSerializer, CollaborationSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by('-created_at')
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  # Allow searching brands by name


class CollaborationViewSet(viewsets.ModelViewSet):
    queryset = Collaboration.objects.select_related('brand').all().order_by('-created_at')
    serializer_class = CollaborationSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['collab_type', 'status', 'platform']
    search_fields = ['campaign_name', 'brand__name']
    ordering_fields = ['created_at', 'follow_up_date', 'campaign_name']