
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Categoria,SubCategoria
from .serializers import categoriaSerializer,subCategoriaSerializer
from django.http import Http404



class ListCategorias(APIView):

    def get(self,request):
        categorias = Categoria.objects.filter(estado=True)
        categorias_json = categoriaSerializer(categorias,many=True)
        return Response(categorias_json.data)

class ListSubCategorias(APIView):
    
    def get(self,request):
        subCategorias = SubCategoria.objects.filter(estado=True)
        subCategorias_json = subCategoriaSerializer(subCategorias,many=True)
        return Response(subCategorias_json.data)

class DetailCategoria(APIView):
    def get(self,request,pk):
        try:
            categoria = Categoria.objects.get(pk=pk)
            categoria_json = categoriaSerializer(categoria)
            return Response(categoria_json.data)
        except Categoria.DoesNotExist:
            raise Http404
