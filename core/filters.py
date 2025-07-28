import django_filters
from core.models import Collaboration

class CollaborationFilter(django_filters.FilterSet):
    pitch_date__gte = django_filters.DateFilter(field_name='pitch_date', lookup_expr='gte')
    pitch_date__lte = django_filters.DateFilter(field_name='pitch_date', lookup_expr='lte')

    class Meta:
        model = Collaboration
        fields = ['platform', 'collab_type', 'status', 'pitch_date__gte', 'pitch_date__lte']
