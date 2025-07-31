from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BrandViewSet, CollaborationViewSet, dashboard_view, CalendarViewAPI

router = DefaultRouter()
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'collaborations', CollaborationViewSet, basename='collaboration')

urlpatterns = [
    path('dashboard-view/', dashboard_view),
    path("calendar-view/", CalendarViewAPI.as_view(), name="calendar-view"),
] + router.urls