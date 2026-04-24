from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DadosConsumoViewSet

# O Router cria automaticamente as rotas de listagem e detalhes
router = DefaultRouter()
router.register(r'dados-consumo', DadosConsumoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]