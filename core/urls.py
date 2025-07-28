from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BrandViewSet, CollaborationViewSet

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'collaborations', CollaborationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]