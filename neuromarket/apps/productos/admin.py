from django.contrib import admin
from .models import Producto,ImagenProducto,DescuentoXVolumen,CuponProducto


admin.site.register(Producto)
admin.site.register(ImagenProducto)
admin.site.register(DescuentoXVolumen)
admin.site.register(CuponProducto)

# Register your models here.
