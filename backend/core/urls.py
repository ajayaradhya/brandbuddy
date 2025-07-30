from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BrandViewSet, CollaborationViewSet, dashboard_view

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'collaborations', CollaborationViewSet)

urlpatterns = [
    path('dashboard-view/', dashboard_view),
    path('', include(router.urls)),
]