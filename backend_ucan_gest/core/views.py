from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Funcionario
from .serializers import FuncionarioSerializers
from .models import CategoriaItem
from .serializers import CategoriaItemSerializers
from .models import AreaItem
from .serializers import AreaItemSerializers
from .models import Item
from .serializers import ItemSerializers



class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset=Funcionario.objects.all()
    serializer_class = FuncionarioSerializers

class CategoriaItemViewSet(viewsets.ModelViewSet):
    queryset=CategoriaItem.objects.all()
    serializer_class = CategoriaItemSerializers

class AreaItemViewSet(viewsets.ModelViewSet):
    queryset=AreaItem.objects.all()
    serializer_class = AreaItemSerializers

class ItemViewSet(viewsets.ModelViewSet):
    queryset=Item.objects.all()
    serializer_class = ItemSerializers

class ItemTotalViewSet(viewsets.ModelViewSet):
    queryset=Item.objects.all()
    serializer_class = ItemSerializers

    def list(self, request, *args, **kwargs):
        queryset=Item.objects.all()
        contagem = queryset.count(  )
        data ={'total_item': contagem}

        return Response(data)

class FuncionarioTotalViewSet(viewsets.ModelViewSet):
    queryset=Funcionario.objects.all()
    serializer_class = FuncionarioSerializers

    def list(self, request, *args, **kwargs):
        queryset=Funcionario.objects.all()
        contagem = queryset.count(  )
        data ={'total_funcionario': contagem}

        return Response(data)

class AreaItemTotalViewSet(viewsets.ModelViewSet):
    queryset=AreaItem.objects.all()
    serializer_class = AreaItemSerializers

    def list(self, request, *args, **kwargs):
        queryset=AreaItem.objects.all()
        contagem = queryset.count()
        data ={'total_area': contagem}

        return Response(data)
    