# Generated by Django 4.2.5 on 2024-06-27 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_funcionario_data_nascimento'),
    ]

    operations = [
        migrations.RenameField(
            model_name='funcionario',
            old_name='departamento',
            new_name='senha',
        ),
    ]
