from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from datetime import datetime
from datetime import timedelta

from .models import Venta, Producto, Usuario, Factura
from .serializers import lstVentasSerializer, lstFacturaSerializer
from django.http import Http404


class ventasList(generics.ListCreateAPIView):
    queryset = Venta.objects.all()
    serializer_class = lstVentasSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset,
            pk=self.kwargs['pk'],
        )
        return obj


# ver las ventas  por id

class DetailVentas(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venta.objects.all()
    serializer_class = lstVentasSerializer


class facturaList(generics.ListCreateAPIView):
    queryset = Factura.objects.all()
    serializer_class = lstFacturaSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset,
            pk=self.kwargs['pk']
        )
        return obj


class DetailFactura(APIView):
    def get(self, request, pk):
        try:
            factura = Factura.objects.get(pk=pk)
            factura_json = lstFacturaSerializer(factura)
            return Response(factura_json)
        except Factura.DoesNotExist:
            raise Http404
