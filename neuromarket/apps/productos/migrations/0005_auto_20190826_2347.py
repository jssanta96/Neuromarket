# Generated by Django 2.2.3 on 2019-08-27 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0004_producto_descuento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='descuento',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
