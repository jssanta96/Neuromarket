from django.shortcuts import render, get_object_or_404
from rest_framework import status
from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from rest_framework.decorators import api_view
from datetime import timedelta

from .models import Producto, ImagenProducto
from .serializers import productoSerializer, imagenProductoSerializer, lstProductosSerializer
from django.http import Http404


class Listproductos(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = lstProductosSerializer

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(
            queryset,
            pk=self.kwargs['pk'],
        )
        return obj


class ListProductosDestacados(APIView):

    def get(self, request):
        fecha = datetime.now() - timedelta(days=7)
        productos = Producto.objects.filter(fecha_creacion__gte=fecha)

        productos_json = productoSerializer(productos, many=True)
        return Response(productos_json.data)


class DetailProducto(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = lstProductosSerializer


class ListImagenProducto(APIView):

    def get(self, request):
        imagenproducto = ImagenProducto.objects.all()
        imagenproducto_json = imagenProductoSerializer(imagenproducto, many=True, context={"request": request})
        return Response(imagenproducto_json.data)


@api_view(['GET', 'PUT', 'DELETE'])
def producto_detail(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializaer = lstProductosSerializer(Producto)
        return Response(serializaer.data)

    elif request.method == 'PUT':
        serializer = lstProductosSerializer(Producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        Producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
