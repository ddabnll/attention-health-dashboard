from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # APONTE PARA O ARQUIVO DA RAIZ (sem o 'core.')
    path('api/', include('api.urls')),
]