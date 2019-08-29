from rest_framework import serializers
from .models import Categoria,SubCategoria
from neuromarket.apps.productos.models import Producto 
from neuromarket.apps.productos.serializers import productoSerializer 
import json




   
        
class subCategoriaSerializer(serializers.ModelSerializer):
    """json subcategoria"""
    Producto = productoSerializer(many=True,read_only=True)

    class Meta:
        model = SubCategoria
        fields = ('id','nombre','Producto')

class categoriaSerializer(serializers.ModelSerializer):
    """json categoria"""   
    subcategoria = subCategoriaSerializer(many=True, read_only=True)
   
    class Meta:
        model= Categoria
        fields = ['id','icono','nombre','subcategoria']
        