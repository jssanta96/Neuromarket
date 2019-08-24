from django.shortcuts import render
from django.contrib.auth.models import User, Group
from neuromarket.api.models import Movie
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers.serializers import MovieSerializer, MovieMiniSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        movies = Movie.objects.all()
        serializer = MovieMiniSerializer(movies, many=True)
        return Response(serializer.data)
