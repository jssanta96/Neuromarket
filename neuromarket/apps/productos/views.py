from django.shortcuts import render

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import timedelta

from .models import Producto,ImagenProducto
from .serializers import productoSerializer,imagenProductoSerializer,lstProductosSerializer
from django.http import Http404



class Listproductos(APIView):
    def get(self,request):
        productos = Producto.objects.all()
        productos_json = lstProductosSerializer(productos,many=True,context={"request": request})
        return Response(productos_json.data)


class ListProductosDestacados(APIView):
    
    def get(self,request):
        fecha = datetime.now() - timedelta(days=7)
        productos = Producto.objects.filter(fecha_creacion__gte=fecha)

       
        productos_json = productoSerializer(productos,many=True)
        return Response(productos_json.data)

class DetailProducto(APIView):
    def get(self,request,pk):
        try:
            producto = Producto.objects.get(pk=pk)
            producto_json = productoSerializer(producto)
            return Response(producto_json.data)
        except Producto.DoesNotExist:
            raise Http404


class ListImagenProducto(APIView):
    
    def get(self,request):
        imagenproducto = ImagenProducto.objects.all()
        imagenproducto_json = imagenProductoSerializer(imagenproducto,many=True,context={"request": request})
        return Response(imagenproducto_json.data)