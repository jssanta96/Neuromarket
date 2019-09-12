from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Factura,Venta
from neuromarket.apps.usuarios.models import Usuario
from neuromarket.apps.tiendas.models import Tienda
from neuromarket.apps.productos.models import Producto
from django.db.models import Subquery
from .serializers import facturaSerializer,misComprasSerializer
from django.http import Http404


class facturaView(APIView):
    def get(self,request,correo):
        try:
            
            usuario = get_object_or_404(Usuario,correo=correo)
            factura = Factura.objects.filter(usuario=usuario.id)
            factura_json = facturaSerializer(factura,many=True,context={"request": request})
            return Response(factura_json.data)
        except Factura.DoesNotExist:
            raise Http404

class misComprasView(APIView):
    def get(self,request,pk):
        try:
            venta = Venta.objects.filter(factura=pk)
            venta_json = misComprasSerializer(venta,many=True,context={"request": request})
            return Response(venta_json.data)
        except Venta.DoesNotExist:
            raise Http404

class misVentasView(APIView):
    def get(self,request,correo):
        try:
            usuario = get_object_or_404(Usuario,correo=correo)
            tienda = get_object_or_404(Tienda,administrador=usuario.id)
            productos = Producto.objects.filter(tienda=tienda.id)
            ventas = Venta.objects.filter(producto_id__in=Subquery(productos.values('id')))
            venta_json = misComprasSerializer(ventas,many=True,context={"request": request})
            return Response(venta_json.data)
        except Venta.DoesNotExist:
            raise Http404  