from rest_framework import serializers
from .models import Venta, Factura


class lstVentasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = ['id', 'producto', 'factura', 'cantidad', 'precio']


class lstFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = ['id', 'fechaCompra', 'usuario', 'metodoPago']
