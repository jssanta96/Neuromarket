from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from .models import Usuario
import random


class usuarioView(APIView):
    def post(self,request):
        data = request.data
        try:
            obj, usuario = Usuario.objects.get_or_create(
                codigo = random.randint(100,800000),
                nombre = data['nombre'],
                correo = data['correo']
            )
            if(usuario):
                return Response("creado exitosamente", status=201)   
        except:
            return Response("El usuario ya existe",status=200)
