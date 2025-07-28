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
    queryset = Collaboration.objects.all().select_related('brand').order_by('-created_at')
    serializer_class = CollaborationSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Fields to filter directly via query params
    filterset_fields = {
        'status': ['exact'],
        'collab_type': ['exact'],
        'platform': ['exact'],
        'followup_date': ['gte', 'lte'],
        'pitch_date': ['gte', 'lte'],
    }

    # Fields to support keyword search
    search_fields = [
        'campaign_name',
        'platform',
        'brand__name',  # enable brand name search
    ]

    ordering_fields = ['pitch_date', 'followup_date', 'created_at']
    ordering = ['-created_at']