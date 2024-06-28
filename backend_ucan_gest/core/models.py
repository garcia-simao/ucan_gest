from django.db import models
from django.contrib.auth.hashers import make_password

class Funcionario(models.Model):
    nome=models.CharField(max_length=100, blank=True)
    email=models.EmailField(max_length=100, blank=True)
    numero_bilhete=models.CharField(max_length=100, blank=True)
    funcao=models.CharField(max_length=100, blank=True)
    senha=models.CharField(max_length=100, blank=True, unique=True)
    endereco=models.CharField(max_length=100, blank=True)
    data_nascimento=models.DateField()
    data_registro=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nome
    
    def save(self, *args, **kwargs):
        self.senha = make_password(self.senha)  # Hashiza a senha antes de salvar
        super().save(*args, **kwargs)
    
class CategoriaItem(models.Model):
    nome=models.CharField(max_length=100)
    data_registro=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nome


class AreaItem(models.Model):
    nome=models.CharField(max_length=100)
    data_registro=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nome



class Item(models.Model):
    nome=models.CharField(max_length=100)
    imagem=models.ImageField()
    estado=models.CharField(max_length=100, blank=True)
    categoria = models.ForeignKey(CategoriaItem, on_delete=models.CASCADE)
    area = models.ForeignKey(AreaItem, on_delete=models.CASCADE)
    tempo_de_vida=models.CharField(max_length=100, blank=True)
    data_compra=models.DateField()
    data_registro=models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nome