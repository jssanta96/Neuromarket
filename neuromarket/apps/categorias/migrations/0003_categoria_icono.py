# Generated by Django 2.2.3 on 2019-08-25 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categorias', '0002_subcategoria_icono'),
    ]

    operations = [
        migrations.AddField(
            model_name='categoria',
            name='icono',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
