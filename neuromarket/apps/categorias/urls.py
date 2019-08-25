from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve

from .views import ListCategorias,ListSubCategorias

urlpatterns = [
    path('', ListCategorias.as_view(), name="listar-categorias"),
    path('subcategorias/', ListSubCategorias.as_view(), name="listar-subcategorias"),
    
]