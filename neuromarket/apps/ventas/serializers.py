from rest_framework import serializers
from .models import Factura,Venta
from neuromarket.apps.productos.models import ImagenProducto
from neuromarket.apps.productos.serializers import productoxComprasSerializer


class facturaSerializer(serializers.ModelSerializer):
    """Datos de Factura para generar el json"""
    class Meta:
        model = Factura
        fields   = '__all__'


class misComprasSerializer(serializers.ModelSerializer):
    """Datos de Ventas para generas el json"""
    producto = productoxComprasSerializer(read_only=True)
    class Meta:
        model = Venta
        fields = ['id','producto','producto','factura','fecha','cantidad','precio','total']

class reporteVentasSerializer(serializers.Serializer):
    fecha = serializers.DateField()
    cant = serializers.IntegerField()