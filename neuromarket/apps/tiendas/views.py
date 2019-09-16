from django.shortcuts import render
from rest_framework.views import APIView
from django.db import IntegrityError
from neuromarket.apps.usuarios.models import Usuario
from rest_framework.response import Response
from .models import Tienda
from django.http import Http404


class tiendaView(APIView):
    def post(self,request):
        data = request.data
        correo = request.POST.get('correo','')
        descripcion = request.POST.get('descripcion','')
        imagen = request.POST.get('imagen',None)
        telefono = request.POST.get('telefono',0)
        try:
            obj, created = Usuario.objects.get_or_create(nombre=data['correousuario'],correo=data['correousuario'])
            obj, created = Tienda.objects.get_or_create(
                nombre = data['nombre'],
                imagen = imagen,
                descripcion = descripcion,
                telefono = telefono,
                correo = correo,
                administrador = obj
            )
            return Response("creado exitosamente", status=201)
        except Usuario.DoesNotExist as u:
            return Response("Error {}".format(u),status=400)
        except IntegrityError as e:
            return Response("El nombre de usuario ya Existe",status=400)
    
    def put(self,request):
        try:
            data = request.data
            imagen = request.data.get('imagen',True)
            tienda = Tienda.objects.get(id=data['id'])
            tienda.correo = data['correo']
            tienda.descripcion = data['descripcion']
            tienda.telefono = data['telefono']
            if(imagen):
                tienda.save()
            else:
                tienda.imagen = imagen
                tienda.save()
            return Response("Actualizado exitosamente", status=200)
        except Tienda.DoesNotExist as u:
            return Response("Error {}".format(u),status=400)
        
        

class validarTienda(APIView):
    def get(self,request,correo):
        try:
            usuario = Usuario.objects.get(correo=correo)
            tienda = Tienda.objects.get(administrador = usuario.id)
            return Response(True,status=200)
        except Usuario.DoesNotExist:
            return Response(False,status=200)
        
        except Tienda.DoesNotExist:
            return Response(False,status=200)