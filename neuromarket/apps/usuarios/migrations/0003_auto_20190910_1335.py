# Generated by Django 2.2.3 on 2019-09-10 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_usuario_codigo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='correo',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]