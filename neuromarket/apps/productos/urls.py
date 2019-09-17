from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve

from .views import *

urlpatterns = [
    path('', Listproductos.as_view(), name="listar-productos"),
    path('filtrar',FilterProducto.as_view() , name="filtro-productos"),
    path('busqueda',SearchProducto.as_view() , name="busqueda-productos"),
    path('<int:pk>', DetailProducto.as_view(), name="listar-producto-detalle"),
    path('del/<int:pk>', DelProducto.as_view(), name="eliminar-producto"),
    path('delcupon/<int:pk>', DelCupon.as_view(), name="eliminar-Cupon"),
    path('validar/<int:pk>', ValidarCupon.as_view(), name="validar-cupon"),
    path('destacados/', ListProductosDestacados.as_view(), name="listar-productosDestacados"),
    path('misproductos/<str:correo>', ListMisProductos.as_view(), name="listar-misproductos"),
    path('cupones',CuponProductoView.as_view(), name="crear-cupon"),
    path('img/', ListImagenProducto.as_view(), name="listar-imgproductos"),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,})
]