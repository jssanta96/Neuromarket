from rest_framework import serializers
from .models import Categoria,SubCategoria
import json

class categoriaSerializer(serializers.ModelSerializer):   
    subcategoria = serializers.StringRelatedField(many=True)
   
    class Meta:
        model= Categoria
        fields = ['id','nombre','subcategoria']
        


   

        
class subCategoriaSerializer(serializers.ModelSerializer):
    Producto = serializers.StringRelatedField(many=True)

    class Meta:
        model = SubCategoria
        fields = ('id','nombre','Producto')