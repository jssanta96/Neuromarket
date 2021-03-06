from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve

from .views import tiendaView,validarTienda

urlpatterns = [
    path('', tiendaView.as_view(), name="crear-tienda"),
    path('validar/<str:correo>', validarTienda.as_view(), name="validar-tienda"),
]