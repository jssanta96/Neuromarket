from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ListProductosDestacados,ListImagenProducto,Listproductos,DetailProducto

urlpatterns = [
    path('', Listproductos.as_view(), name="listar-productos"),
    path('<int:pk>', DetailProducto.as_view(), name="listar-producto-detalle"),
    path('destacados/', ListProductosDestacados.as_view(), name="listar-productosDestacados"),
    path('img/', ListImagenProducto.as_view(), name="listar-imgproductos"),

    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,})
]