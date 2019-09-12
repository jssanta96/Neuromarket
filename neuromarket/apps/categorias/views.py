
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.db.models import Subquery
from .models import Categoria,SubCategoria
from neuromarket.apps.productos.models import Producto 
from neuromarket.apps.productos.serializers import productoSerializer 
from .serializers import categoriaSerializer,subCategoriaSerializer
from django.http import Http404



class ListCategorias(APIView):

    def get(self,request):
        categorias = Categoria.objects.filter(estado=True)
        
        categorias_json = categoriaSerializer(instance=categorias,many=True)
        return Response(categorias_json.data)

class ListSubCategorias(APIView):
    
    def get(self,request):
        subCategorias = SubCategoria.objects.filter(estado=True)
        subCategorias_json = subCategoriaSerializer(instance=subCategorias,many=True)
        return Response(subCategorias_json.data)

class FilterCategoria(APIView):
    def post(self,request):
        data = request.data
        subCategorias = SubCategoria.objects.filter(nombre__icontains=data['campo'])
        producto = Producto.objects.filter(subcategoria_id__in=Subquery(subCategorias.values('id')))
        subCategorias_json = productoSerializer(instance=producto,many=True,context={"request": request})
        return Response(subCategorias_json.data)


