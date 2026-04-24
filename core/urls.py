from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Criamos o caminho 'api/' para acessar os dados
    path('api/', include('consumo.urls')),
]