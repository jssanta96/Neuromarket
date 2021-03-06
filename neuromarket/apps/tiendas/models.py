from django.db import models
from neuromarket.apps.usuarios.models import Usuario

class Tienda(models.Model):
    nombre = models.CharField(max_length = 150,unique=True)
    descripcion = models.CharField(max_length = 250,blank=True)
    imagen = models.ImageField(
        upload_to='tienda/img',
        blank=True,
        null=True
    )
    telefono = models.BigIntegerField(default=0)
    correo = models.EmailField(blank=True)
    administrador = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre



# Create your models here.
