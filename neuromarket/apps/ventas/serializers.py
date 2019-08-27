from rest_framework import serializers

from neuromarket.apps.productos.serializers import lstProductosSerializer
from .models import Venta, Factura


class lstVentasSerializer(serializers.ModelSerializer):
    producto = lstProductosSerializer(many=True, read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'producto', 'factura', 'cantidad', 'precio']


class lstFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = ['id', 'fechaCompra', 'usuario', 'metodoPago']
