from rest_framework import serializers
from .models import Categoria,SubCategoria

class categoriaSerializer(serializers.ModelSerializer):    
    class Meta:
        model= Categoria
        fields = ['id','nombre','subcategoria']
        depth = 1
        

        
class subCategoriaSerializer(serializers.Serializer):
    categoria = categoriaSerializer()

    class Meta:
        model = SubCategoria
        fields = ('id','categoria','nombre','descripcion')