from django.db import models
from neuromarket.apps.categorias.models import SubCategoria
from neuromarket.apps.tiendas.models import Tienda
import json
class Producto(models.Model):
    """Modelo de un producto"""
    nombre = models.CharField(max_length = 100)
    descripcion = models.CharField(max_length = 300)
    costo = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    descuento = models.PositiveIntegerField(blank=True,null=True)
    condicion = models.BooleanField(default=True)
    subcategoria = models.ForeignKey(SubCategoria,related_name='Producto', on_delete= models.CASCADE)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        response_data = {}
        response_data['id'] = self.id
        response_data['name'] = self.nombre
        
        return json.dumps(response_data)


class ImagenProducto(models.Model):
    """Modelo Imagen Producto"""
    nombre = models.CharField(max_length = 100)
    imagen = models.ImageField(
        upload_to='productos/img',
        blank=True,
        null=True
    )
    producto = models.ForeignKey(Producto,related_name='ImagenProducto', on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "http://localhost:8000"+self.imagen.url
        

class DescuentoXVolumen(models.Model):
    """Modelo descuento por volumen sobre un producto"""
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    porcentajeDescuento = models.PositiveIntegerField()
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.producto.nombre) + ":" + str(self.porcentajeDescuento) +"%"
    
