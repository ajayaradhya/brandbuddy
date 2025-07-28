from rest_framework import serializers
from .models import Brand, Collaboration


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'


class CollaborationSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)

    class Meta:
        model = Collaboration
        fields = '__all__'

    def validate(self, data):
        collab_type = data.get('collab_type')
        barter_product = data.get('barter_product')

        if collab_type == 'barter' and not barter_product:
            raise serializers.ValidationError({
                'barter_product': "This field is required for barter collaborations."
            })

        if collab_type != 'barter' and barter_product:
            raise serializers.ValidationError({
                'barter_product': "Only allowed if collab type is 'barter'."
            })

        return data
