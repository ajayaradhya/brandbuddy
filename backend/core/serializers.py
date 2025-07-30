from rest_framework import serializers
from .models import Brand, Collaboration


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__' 


class CollaborationSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)  # show nested brand in GET
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',  # use `brand_id` to write to `brand`
        write_only=True
    )

    class Meta:
        model = Collaboration
        fields = [
            'id', 'brand', 'brand_id', 'campaign_name', 'platform', 'collab_type',
            'status', 'pitch_date', 'followup_date', 'delivery_deadline',
            'deliverables', 'notes', 'amount', 'barter_product', 'barter_value',
            'created_at'
        ]
