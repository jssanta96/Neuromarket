# Generated by Django 2.2.3 on 2019-08-24 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categorias', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='subcategoria',
            name='icono',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
