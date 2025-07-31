from rest_framework import serializers
from .models import Brand, Collaboration


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__' 


class CollaborationSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True
    )

    class Meta:
        model = Collaboration
        fields = [
            'id', 'brand', 'brand_id', 'campaign_name',
            'platform', 'collab_type', 'status',
            'pitch_date', 'followup_date', 'delivery_deadline',
            'start_date', 'end_date',
            'payment_due_date', 'payment_received_date', 'reminder_date',
            'deliverables', 'notes',
            'amount', 'barter_product', 'barter_value',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
