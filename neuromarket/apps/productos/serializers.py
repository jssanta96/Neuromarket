from rest_framework import serializers
from .models import Producto,ImagenProducto,CuponProducto,DescuentoXVolumen
from neuromarket.apps.categorias.models import SubCategoria,Categoria
from neuromarket.apps.tiendas.models import Tienda


class cuponProductoSerializer(serializers.ModelSerializer):
    "Datos cupon por producto"
    class Meta:
        model = CuponProducto
        fields = '__all__'

class categoriaXProductoSerializer(serializers.ModelSerializer):
    """Datos de Categoria para el json de productos """
    class Meta:
        model = Categoria
        fields   = ['id','icono','nombre']

class tiendaXProductoSerializer(serializers.ModelSerializer):
    """Datos de a tienda para el json de productos """
    class Meta:
        model = Tienda
        fields = ['id','nombre']

class subCategoriaProductoSerializer(serializers.ModelSerializer):
    """Datos de a subCategoria para el json de productos """
    categoria = categoriaXProductoSerializer(read_only=True)
    class Meta:
        model = SubCategoria
        fields = ['id','nombre','categoria']

class imagenProductoSerializer(serializers.ModelSerializer):
    """Datos de la(s) imagenes para el json de productos """
    class Meta:
        model= ImagenProducto
        fields = ['id','nombre','imagen']

class DescuentoXVolumenSerializer(serializers.ModelSerializer):
    """json Descuentos por Volumen """
    class Meta:
        model= DescuentoXVolumen
        fields = ['id','cantidad','porcentajeDescuento']
     
class productoSerializer(serializers.ModelSerializer):
    """json productos """
    ImagenProducto = imagenProductoSerializer(many=True, read_only=True )
    subcategoria = subCategoriaProductoSerializer(read_only=True)
    tienda = tiendaXProductoSerializer(read_only = True)
    CuponProducto = cuponProductoSerializer(many=True,read_only=True)
    DescuentoXVolumen = DescuentoXVolumenSerializer(many=True,read_only=True)
    
    class Meta:
        model= Producto
        fields = '__all__'

class productoxComprasSerializer(serializers.ModelSerializer):
    """json productos """
    ImagenProducto = imagenProductoSerializer(many=True, read_only=True )
    
    class Meta:
        model= Producto
        fields = ['nombre','ImagenProducto']
        