from django.urls import path

from myapp.views import about, article_detail, home

urlpatterns = [
    path('about/<int:id>/<slug:slug>/', article_detail),
    path('about/', about, name='about'),
    path('', home, name='home'),
    path('koi', home, name='main'),
]
