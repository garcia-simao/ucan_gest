"""
URL configuration for backend_ucan_gest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers, serializers, viewsets

from core.views import FuncionarioViewSet
from core.views import CategoriaItemViewSet
from core.views import AreaItemViewSet
from core.views import ItemViewSet
from core.views import ItemTotalViewSet
from core.views import FuncionarioTotalViewSet
from core.views import AreaItemTotalViewSet

router = routers.DefaultRouter()
router.register(r'funcionario', FuncionarioViewSet, basename='funcionario1')
router.register(r'categoria-itens', CategoriaItemViewSet)
router.register(r'area-itens', AreaItemViewSet, basename='area1')
router.register(r'itens', ItemViewSet, basename="item1")
router.register(r'total-itens', ItemTotalViewSet, basename="item2")
router.register(r'total-funcionario', FuncionarioTotalViewSet, basename='funcionario2')
router.register(r'total-area', AreaItemTotalViewSet, basename='area2')


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)