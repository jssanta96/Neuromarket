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
        
        try:
            usuario = Usuario.objects.get(correo=data['correoUsuario'])
            obj , tienda = Tienda.objects.get_or_create(
                nombre = data['nombre'],
                imagen = data['imagen'],
                descripcion = data['descripcion'],
                telefono = data['telefono'],
                correo = data['correo'],
                administrador = usuario
            )
            return Response("creado exitosamente", status=201)
        except Usuario.DoesNotExist as u:
            return Response("Error {}".format(u),status=400)
        except IntegrityError as e:
            return Response("Error {}".format(e),status=400)
