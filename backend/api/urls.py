from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DadosConsumoViewSet

router = DefaultRouter()
router.register(r'dados-consumo', DadosConsumoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]