from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import timedelta
from neuromarket.apps.tiendas.models import Tienda
from neuromarket.apps.categorias.models import Categoria,SubCategoria
from neuromarket.apps.usuarios.models import Usuario
from .models import Producto,ImagenProducto,CuponProducto,DescuentoXVolumen
from .serializers import productoSerializer,imagenProductoSerializer
from django.http import Http404,JsonResponse
import random


class Listproductos(APIView):
    def get(self,request):
        productos = Producto.objects.filter(estado=True,stock__gt=0)
        productos_json = productoSerializer(productos,many=True,context={"request": request})
        return Response(productos_json.data)

    def post(self,request):
        data = request.data
        try:
            subcategoria = SubCategoria.objects.get(id=data['subcategoria'])
            usuario = Usuario.objects.get(correo = data['correo'])
            tienda = Tienda.objects.get(administrador = usuario.id)
            producto = Producto.objects.create(
                nombre = data['nombre'],
                descripcion = data['descripcion'],
                descuento= data['descuento'],
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

    
    def put(self,request):
        data = request.data
        try:
            
            producto = Producto.objects.get(id = data["id"])
            subcategoria = request.data.get('subcategoria',None)
            nombre = request.data.get('nombre',None)
            descripcion = request.data.get('descripcion',None)
            stock = request.data.get('stock',None)
            descuento = request.data.get('descuento',None)
            condicion = request.data.get('condicion',None)
            costo = request.data.get('costo',None)
            
            if(nombre!=None):
                producto.nombre = nombre
            
            if(descripcion!=None):
                producto.descripcion = descripcion
            
            if(stock!=None):
                producto.stock = stock
            
            if(condicion!=None):
                producto.condicion = condicion
            
            if(costo!=None):
                producto.costo = costo
            
            if(descuento!=None):
                producto.descuento = descuento
            
            if(subcategoria!=None):
                subcategoria = SubCategoria.objects.get(id=subcategoria)
                producto.subcategoria = subcategoria
                
            producto.save()

            return Response("Actualizado exitosamente", status=200)
        except SubCategoria.DoesNotExist:
            return Response("La subcategoria no exite",status=400)
        except Producto.DoesNotExist:
            return Response("La Producto no exite",status=400)
        
            

   


class ListProductosDestacados(APIView):
    
    def get(self,request):
        fecha = datetime.now() - timedelta(days=7)
        productos = Producto.objects.filter(fecha_creacion__gte=fecha,estado =True)

       
        productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
        return Response(productos_json.data)

class DetailProducto(APIView):
    def get(self,request,pk):
        try:
            producto = Producto.objects.get(pk=pk,estado =True)
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
                productos = Producto.objects.filter(condicion = True,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            if(data['estado'] == False and data['descuento'] == None):
                productos = Producto.objects.filter(condicion = False,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)

            if(data['estado'] == None and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=0,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == None and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == True and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=1,condicion=True,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)

            if(data['estado'] == True and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0,condicion=True,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == False and data['descuento'] == True):
                productos = Producto.objects.filter(descuento__gt=0,condicion=False,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            if(data['estado'] == False and data['descuento'] == False):
                productos = Producto.objects.filter(descuento=0,condicion=False,estado =True)
                productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
                return Response(productos_json.data)
            
            

            productos = Producto.objects.filter(estado =True)
            productos_json = productoSerializer(instance=productos,many=True,context={"request": request})
            return Response(productos_json.data)
        except Producto.DoesNotExist:
            return Http404
            
class SearchProducto(APIView):
    def post(self,request):
        data = request.data
        producto = Producto.objects.filter(nombre__icontains=data['campo'],estado =True)
        producto_json = productoSerializer(instance=producto,many=True,context={"request": request})
        return Response(producto_json.data)

class ListMisProductos(APIView):
    def get(self,request,correo):
        usuario = Usuario.objects.get(correo=correo)
        tienda = Tienda.objects.get(administrador=usuario.id)
        productos = Producto.objects.filter(tienda = tienda.id,estado =True)
        productos_json = productoSerializer(productos,many=True,context={"request": request})
        return Response(productos_json.data)

class CuponProductoView(APIView):
    def post(self,request):
        try:
            data = request.data
            producto = Producto.objects.get(id=data['idproducto'])
            obj, created = CuponProducto.objects.get_or_create(
                producto = producto,
                cantidad = data['cantidad'],
                codigo=random.randint(100,800000),
                descuento=data['descuento']
            )

            return Response("Creado Satisfactoriamente",status=201)
        except:
            return Response("Error Datos",status=404)

    

        

class DelProducto(APIView):
    def delete(self,request,pk):
        data = request.data
        try:
            producto = Producto.objects.get(id=pk)
            producto.estado = False
            producto.save()
            return Response("Eliminado exitosamente", status=200)
        except Producto.DoesNotExist:
            return Response("La Producto no exite",status=400)


class ValidarCupon(APIView):
    def get(self,request,pk):
        try:
            cupon = CuponProducto.objects.get(codigo=pk)
            return JsonResponse({'descuento':cupon.descuento})
        except CuponProducto.DoesNotExist:
            return JsonResponse({'descuento':'El producto no posee descuento'})
 
class DelCupon(APIView):

    def delete(self,request,pk):
        try:
            cupon = CuponProducto.objects.filter(id=pk)
            cupon.delete()
            return Response("Eliminado exitosamente")
        except CuponProducto.DoesNotExist:
            return Response("El cupon no exite")


class DescuentoXVolumenView(APIView):
    def post(self,request):
        try:
            data = request.data
            producto = Producto.objects.get(id=data['idproducto'])
            obj, created = DescuentoXVolumen.objects.get_or_create(
                producto = producto,
                cantidad = data['cantidad'],
                porcentajeDescuento=data['descuento']
            )

            return Response("Creado Satisfactoriamente",status=201)
        except:
            return Response("Error Datos",status=404)

class DelDescuentoXVolumen(APIView):

    def delete(self,request,pk):
        try:
            descuento = DescuentoXVolumen.objects.filter(id=pk)
            descuento.delete()
            return Response("Eliminado exitosamente")
        except CuponProducto.DoesNotExist:
            return Response("El descuento no exite")
