from django.contrib.auth.models import User, Group
from rest_framework import serializers
from neuromarket.api.models import Movie

class MovieSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Movie
        fields = ('id','title','desc','year')

class MovieMiniSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Movie
        fields = ('id','title')

