from rest_framework import serializers
from .models import Funcionario
from .models import CategoriaItem
from .models import AreaItem
from .models import Item





class FuncionarioSerializers(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ['id', 'nome', 'email', 'numero_bilhete','funcao','senha', 'endereco', 'data_nascimento','data_registro'] 

class CategoriaItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = CategoriaItem
        fields = ['id', 'nome','data_registro']

class AreaItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = AreaItem
        fields = ['id', 'nome', 'data_registro']

class ItemSerializers(serializers.ModelSerializer):
    categoria_nome= serializers.SerializerMethodField()
    categoria = serializers.PrimaryKeyRelatedField(queryset=CategoriaItem.objects.all())
    area_nome= serializers.SerializerMethodField()
    area = serializers.PrimaryKeyRelatedField(queryset=AreaItem.objects.all())

    class Meta:
        model = Item
        fields = ['id', 'nome', 'imagem', 'estado','categoria','categoria_nome','area','area_nome', 'tempo_de_vida','data_compra','data_registro']
    
    def get_categoria_nome(self, obj):
        return obj.categoria.nome
    
    def get_area_nome(self, obj):
        return obj.area.nome

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField()