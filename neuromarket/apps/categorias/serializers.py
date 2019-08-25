from rest_framework import serializers
from .models import Categoria,SubCategoria
from neuromarket.apps.productos.models import Producto 
import json


class ProductoSerializer(serializers.ModelSerializer):
    """Datos de lo(s) productos para el json de subcategorias """
    class Meta:
        model = Producto
        fields = ['id','nombre']

   
        
class subCategoriaSerializer(serializers.ModelSerializer):
    """json subcategoria"""
    Producto = ProductoSerializer(many=True,read_only=True)

    class Meta:
        model = SubCategoria
        fields = ('id','nombre','Producto')

class categoriaSerializer(serializers.ModelSerializer):
    """json categoria"""   
    subcategoria = subCategoriaSerializer(many=True, read_only=True)
   
    class Meta:
        model= Categoria
        fields = ['id','icono','nombre','subcategoria']
        