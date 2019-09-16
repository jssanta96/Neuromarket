# Generated by Django 2.2.3 on 2019-09-16 03:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0007_auto_20190912_2328'),
    ]

    operations = [
        migrations.AddField(
            model_name='cuponproducto',
            name='cantidad',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='descuentoxvolumen',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='DescuentoXVolumen', to='productos.Producto'),
        ),
    ]
