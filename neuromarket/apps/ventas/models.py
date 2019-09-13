from django.db import models
from neuromarket.apps.productos.models import Producto
from neuromarket.apps.usuarios.models import Usuario

PAY_CHOICES = (
    ("PSE", "PSE"),
    ("CREDITO", "Credito"),
    ("BITCOIN", "Bitcoin"),
    ("PAYPAL", "Paypal"),
)

class Factura(models.Model):
    fechaCompra = models.DateTimeField(auto_now=True)
    usuario = models.ForeignKey(Usuario,on_delete=models.CASCADE)
    metodoPago = models.CharField(max_length = 20)
    total = models.PositiveIntegerField()
    def __str__(self):
        return str(self.fechaCompra) + ":" + str(self.usuario.nombre)


class Venta(models.Model):
    producto = models.ForeignKey(Producto,on_delete=models.CASCADE)
    factura = models.ForeignKey(Factura,on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now=True)
    cantidad = models.PositiveIntegerField()
    precio = models.PositiveIntegerField()
    total = models.PositiveIntegerField()

    def __str__(self):
        return str(self.producto.nombre) + ":" + str(self.factura.id)