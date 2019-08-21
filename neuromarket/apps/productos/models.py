from django.db import models
from neuromarket.apps.categorias.models import SubCategoria
from neuromarket.apps.tiendas.models import Tienda

class Producto(models.Model):
    """Modelo de un producto"""
    nombre = models.CharField(max_length = 100)
    descripcion = models.CharField(max_length = 300)
    costo = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    condicion = models.BooleanField(default=True)
    subcategoria = models.ForeignKey(SubCategoria, on_delete= models.CASCADE)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.nombre


class ImagenProducto(models.Model):
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
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    porcentajeDescuento = models.PositiveIntegerField()
    estado = models.BooleanField(default=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.producto.nombre) + ":" + str(self.porcentajeDescuento) +"%"
    
# Create your models here.
