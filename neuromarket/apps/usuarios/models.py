from django.db import models

class Usuario(models.Model):
    codigo = models.CharField(max_length=250)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField()
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
# Create your models here.
