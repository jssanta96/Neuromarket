from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Factura,Venta
from neuromarket.apps.usuarios.models import Usuario
from neuromarket.apps.tiendas.models import Tienda
from neuromarket.apps.productos.models import Producto
from django.db.models import Subquery
from .serializers import facturaSerializer,misComprasSerializer,reporteVentasSerializer
from django.http import Http404
from django.db.models import Count



class facturaView(APIView):
    def get(self,request,correo):
        try:
            
            usuario = get_object_or_404(Usuario,correo=correo)
            factura = Factura.objects.filter(usuario=usuario.id)
            factura_json = facturaSerializer(factura,many=True,context={"request": request})
            return Response(factura_json.data)
        except Factura.DoesNotExist:
            raise Http404

    

class misComprasView(APIView):
    def get(self,request,pk):
        try:
            venta = Venta.objects.filter(factura=pk)
            venta_json = misComprasSerializer(venta,many=True,context={"request": request})
            return Response(venta_json.data)
        except Venta.DoesNotExist:
            raise Http404


class misVentasView(APIView):
    def get(self,request,correo):
        try:
            usuario = get_object_or_404(Usuario,correo=correo)
            tienda = get_object_or_404(Tienda,administrador=usuario.id)
            productos = Producto.objects.filter(tienda=tienda.id)
            ventas = Venta.objects.filter(producto_id__in=Subquery(productos.values('id')))
            venta_json = misComprasSerializer(ventas,many=True,context={"request": request})
            return Response(venta_json.data)
        except Venta.DoesNotExist:
            raise Http404  


class comprarView(APIView):
    def get(self,request):
        import pdb; pdb.set_trace()
        pass
    def post(self,request):
        try:
            data = request.data
            usuario = Usuario.objects.get(correo=data['comprador'])
            factura = Factura.objects.create(usuario= usuario, metodoPago = data['metodopago'],total= 0)
            total_factura = 0
            
            for item in data['venta']:
                producto = Producto.objects.get(id= item['id'])
                venta = Venta.objects.create(
                    producto=producto,
                    factura = factura,
                    cantidad = item['cantidad'],
                    precio = item['precio'],
                    total = int(item['cantidad']) * int(item['precio'])
                )
                producto.stock -= venta.cantidad
                producto.save()
                total_factura += venta.total
            
            factura.total = total_factura
            factura.save()
            return  Response("Se ha registrado su compra Correctamente",status= 201)
        except:
            return  Response("erroor",status= 201)
       


class ventasReportView(APIView):
    def get(self,request,correo):
        usuario = Usuario.objects.get(correo=correo)
        tienda = Tienda.objects.get(administrador = usuario.id)
        productos = Producto.objects.filter(tienda=tienda.id)
        ventas = Venta.objects.values('fecha').annotate(cant=Count('fecha'))
        ventas_json = reporteVentasSerializer(ventas,many=True,context={"request": request})
        return Response(ventas_json.data)