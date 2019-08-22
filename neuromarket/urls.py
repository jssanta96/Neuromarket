"""neuromarket URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.conf.urls import url
from django.conf import settings
from django.views.static import serve
from django.urls import path, include
from rest_framework import routers
from neuromarket.api import views

router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^',include(router.urls)),
    path('productos/',include(('neuromarket.apps.productos.urls','productos'),namespace='productos')),
    path('categorias/',include(('neuromarket.apps.categorias.urls','categorias'),namespace='categorias')),
    path('api-auth',include('rest_framework.urls',namespace='rest_framework')),
    url(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT,})

]
