# Generated by Django 4.2.5 on 2024-06-28 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_rename_departamento_funcionario_senha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='funcionario',
            name='senha',
            field=models.CharField(blank=True, max_length=100, unique=True),
        ),
    ]
