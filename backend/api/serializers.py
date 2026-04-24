from rest_framework import serializers
from .models import DadosConsumo  # O ponto é essencial aqui

class DadosConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DadosConsumo
        # Incluímos todos os campos que importamos do Kaggle
        fields = '__all__'