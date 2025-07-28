import django_filters
from .models import Collaboration

class CollaborationFilter(django_filters.FilterSet):
    pitch_date__gte = django_filters.DateFilter(field_name='pitch_date', lookup_expr='gte')
    pitch_date__lte = django_filters.DateFilter(field_name='pitch_date', lookup_expr='lte')
    followup_date__gte = django_filters.DateFilter(field_name='followup_date', lookup_expr='gte')
    followup_date__lte = django_filters.DateFilter(field_name='followup_date', lookup_expr='lte')

    class Meta:
        model = Collaboration
        fields = ['status', 'platform', 'collab_type', 'pitch_date__gte', 'pitch_date__lte', 'followup_date__gte', 'followup_date__lte']
