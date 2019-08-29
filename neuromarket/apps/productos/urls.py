from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve

from .views import FilterProducto,ListProductosDestacados,ListImagenProducto,Listproductos,DetailProducto,SearchProducto

urlpatterns = [
    path('', Listproductos.as_view(), name="listar-productos"),
    path('filtrar',FilterProducto.as_view() , name="filtro-productos"),
    path('busqueda',SearchProducto.as_view() , name="busqueda-productos"),
    path('<int:pk>', DetailProducto.as_view(), name="listar-producto-detalle"),
    path('destacados/', ListProductosDestacados.as_view(), name="listar-productosDestacados"),
    path('img/', ListImagenProducto.as_view(), name="listar-imgproductos"),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,})
]