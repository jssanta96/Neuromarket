# Generated by Django 2.2.3 on 2019-08-21 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='codigo',
            field=models.CharField(default=0, max_length=250),
            preserve_default=False,
        ),
    ]
