from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve
from .views import facturaView,misComprasView,misVentasView

urlpatterns = [
    path('<str:correo>', facturaView.as_view(), name="listar-factura"),
    path('miscompras/<int:pk>', misComprasView.as_view(), name="listar-mis-compras"),
    path('misventas/<str:correo>', misVentasView.as_view(), name="listar-mis-ventas"),
    
]