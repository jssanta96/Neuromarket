from rest_framework import serializers
from .models import Producto,ImagenProducto


class lstProductosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id','nombre']

class productoSerializer(serializers.ModelSerializer):
    ImagenProducto = serializers.StringRelatedField(many=True)
    class Meta:
        model= Producto
        fields = ['id','nombre','descripcion','ImagenProducto','condicion','subcategoria','tienda','fecha_creacion']
        depth = 2

class imagenProductoSerializer(serializers.ModelSerializer):
   
    class Meta:
        imagen = serializers.HyperlinkedModelSerializer() 
        model= ImagenProducto
        fields = ['id','nombre','imagen','producto']
        depth = 3

    def get_imagen_url(self, ImagenProducto):
        request = self.context.get('request')
        imagen = ImagenProducto.imagen.url
        return request.build_absolute_uri(imagen)
       

   
