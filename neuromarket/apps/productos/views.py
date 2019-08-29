from django.shortcuts import render

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import timedelta
from neuromarket.apps.tiendas.models import Tienda
from neuromarket.apps.categorias.models import Categoria,SubCategoria
from .models import Producto,ImagenProducto
from .serializers import productoSerializer,imagenProductoSerializer
from django.http import Http404



class Listproductos(APIView):
    def get(self,request):
        productos = Producto.objects.all()
        productos_json = productoSerializer(productos,many=True,context={"request": request})
        return Response(productos_json.data)

    def post(self,request):
        data = request.data
        try:
            subcategoria = SubCategoria.objects.get(id=data['subcategoria'])
            tienda = Tienda.objects.get(id=data['tienda'])
            producto = Producto.objects.create(
                nombre = data['nombre'],
                descripcion = data['descripcion'],
                stock = data['stock'],
                condicion = data['condicion'],
                costo = data['costo'],
                subcategoria = subcategoria,
                tienda = tienda

            )
            for img in data.getlist('file'):
                ImagenProducto.objects.create(
                    nombre=img.name,
                    imagen = img,
                    producto = producto
                )
            return Response("creado exitosamente", status=201)
        except:
            return Response("error en los datos",status=400)

    
    def put(self,request,pk):
        pass

    def delete(self,request,pk):
        pass


class ListProductosDestacados(APIView):
    
    def get(self,request):
        fecha = datetime.now() - timedelta(days=7)
        productos = Producto.objects.filter(fecha_creacion__gte=fecha)

       
        productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
        return Response(productos_json.data)

class DetailProducto(APIView):
    def get(self,request,pk):
        try:
            producto = Producto.objects.get(pk=pk)
            producto_json = productoSerializer(producto,context={"request": request})
            return Response(producto_json.data)
        except Producto.DoesNotExist:
            raise Http404


class ListImagenProducto(APIView):
    
    def get(self,request):
        imagenproducto = ImagenProducto.objects.all()
        imagenproducto_json = imagenProductoSerializer(imagenproducto,many=True,context={"request": request})
        return Response(imagenproducto_json.data)


class FilterProducto(APIView):

    def get(self,request):
        data = request.data
        import pdb; pdb.set_trace()

    def post(self,request):
        data = request.data

        try:
            if(data['estado'] == True and data['descuento'] == None):
                productos = Producto.objects.filter(condicion = True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            if(data['estado'] == False and data['descuento'] == None):
                productos = Producto.objects.filter(condicion = False)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)

            if(data['estado'] == None and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=0)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == None and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == True and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=1,condicion=True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)

            if(data['estado'] == True and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0,condicion=True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == False and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=0,condicion=False)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == False and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0,condicion=False)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            

            productos = Producto.objects.all()
            productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
            return Response(productos_json.data)
        except Producto.DoesNotExist:
            return Http404
            
class SearchProducto(APIView):
    def post(self,request):
        data = request.data
        producto = Producto.objects.filter(nombre__icontains=data['campo'])
        producto_json = productoSerializer(instance=producto,many=True,context={"request": request})
        return Response(producto_json.data)

            
        