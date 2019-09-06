from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.views.static import serve

from .views import ventasList, DetailVentas, facturaList, DetailFactura

urlpatterns = [

    path('', ventasList.as_view(), name="listar-ventas"),
    path('<int:pk>', DetailVentas.as_view(), name="listar-ventas-detalle"),
    path('', facturaList.as_view(), name="listar-facturas"),
    path('<int:pk>', DetailFactura.as_view(), name="listar-ventas-detalle"),
    path('factura/',facturaList.as_view(), name="listar-las-facturas" ),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, }),


]
