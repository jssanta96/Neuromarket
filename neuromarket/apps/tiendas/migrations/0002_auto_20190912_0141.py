# Generated by Django 2.2.3 on 2019-09-12 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiendas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tienda',
            name='nombre',
            field=models.CharField(max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name='tienda',
            name='telefono',
            field=models.BigIntegerField(),
        ),
    ]
