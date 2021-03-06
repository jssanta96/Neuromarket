from django.db import models

class Usuario(models.Model):
    codigo = models.CharField(max_length=250,blank=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50,blank=True)
    correo = models.EmailField(unique=True)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
# Create your models here.
