from rest_framework import serializers
from .models import DadosConsumo

class DadosConsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DadosConsumo
        # Incluímos todos os campos que importamos do Kaggle
        fields = '__all__'