from django.db import models
import json
from django.core import serializers
from django.http import HttpResponse

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre

class SubCategoria(models.Model):
    icono = models.CharField(max_length=200,blank=True)
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, related_name='subcategoria' , on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)

    def __str__(self):
        
        response_data = {}
        response_data['id'] = self.id
        response_data['name'] = self.nombre
        return str(response_data)
