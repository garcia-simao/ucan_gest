from django.contrib import admin

from .models import Funcionario
from .models import CategoriaItem
from .models import AreaItem
from .models import Item

admin.site.register(CategoriaItem)
admin.site.register(AreaItem)
admin.site.register(Funcionario)
admin.site.register(Item)