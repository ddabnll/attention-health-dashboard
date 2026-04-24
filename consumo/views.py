from rest_framework import viewsets
from .models import DadosConsumo
from .serializers import DadosConsumoSerializer

class DadosConsumoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite visualizar os dados de consumo de Reels e Shorts.
    """
    queryset = DadosConsumo.objects.all()
    serializer_class = DadosConsumoSerializer