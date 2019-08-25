from rest_framework import serializers
from .models import Producto,ImagenProducto
from neuromarket.apps.categorias.models import SubCategoria
from neuromarket.apps.tiendas.models import Tienda

class tiendaXProductoSerializer(serializers.ModelSerializer):
    """Datos de a tienda para el json de productos """
    class Meta:
        model = Tienda
        fields = ['id','nombre']

class subCategoriaProductoSerializer(serializers.ModelSerializer):
    """Datos de a subCategoria para el json de productos """
    class Meta:
        model = SubCategoria
        fields = ['id','nombre']




class imagenProductoSerializer(serializers.ModelSerializer):
    """Datos de la(s) imagenes para el json de productos """
   
    class Meta:
       
        model= ImagenProducto
        fields = ['id','nombre','imagen']
     
        

class productoSerializer(serializers.ModelSerializer):
    """json productos """
    ImagenProducto = imagenProductoSerializer(many=True, read_only=True )
    subcategoria = subCategoriaProductoSerializer(read_only=True)
    tienda = tiendaXProductoSerializer(read_only = True)
    class Meta:
        model= Producto
        fields = '__all__'
        
