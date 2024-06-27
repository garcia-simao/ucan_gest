from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

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

    def get_queryset(self):
        queryset = Item.objects.all()
        data = self.request.query_params.get('data')

        if data:
            queryset=queryset.filter(data_compra=data)
            return queryset

        return queryset 

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

def gerar_pdf(request, data):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="itens_{data}.pdf"'

    # Converte a data de string para um objeto datetime
    data_obj = datetime.strptime(data, '%Y-%m-%d')

    # Crie um canvas
    p = canvas.Canvas(response, pagesize=letter)
    width, height = letter

    # Adicione um título
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, height - 50, f'RELATÓRIO DE INTENS UCAN GEST DE {data}')

    # Adicione os itens
    y_position = height - 100
    p.setFont("Helvetica", 12)

    # Busque os itens do banco de dados com base na data
    itens = Item.objects.filter(data_compra=data_obj)
    cont=1
    for item in itens:
        p.drawString(100, y_position, f'{cont}-Nome: {item.nome}')
        y_position -= 20
        p.drawString(100, y_position, f' Categoria: {item.categoria}')
        y_position -= 20
        p.drawString(100, y_position, f' Estado: {item.estado}')
        y_position -= 20
        p.drawString(100, y_position, f' Área: {item.area}')
        y_position -= 20
        p.drawString(100, y_position, f' Tempo de Vida: {item.tempo_de_vida}')
        y_position -= 20
        p.drawString(100, y_position, f' data da compra: {item.data_compra}')
        y_position -= 40 
        cont=cont+1

        if y_position < 50:
            p.showPage()
            y_position = height - 50
    p.showPage()
    p.save()

    return response 