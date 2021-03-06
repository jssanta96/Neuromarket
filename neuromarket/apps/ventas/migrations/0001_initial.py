# Generated by Django 2.2.3 on 2019-08-21 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('usuarios', '0001_initial'),
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fechaCompra', models.DateTimeField(auto_now=True)),
                ('metodoPago', models.CharField(choices=[('PSE', 'PSE'), ('CREDITO', 'Credito'), ('BITCOIN', 'Bitcoin'), ('PAYPAL', 'Paypal')], default='PSE', max_length=20)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.Usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('precio', models.PositiveIntegerField()),
                ('factura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.Factura')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='productos.Producto')),
            ],
        ),
    ]
