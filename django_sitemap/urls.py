"""django_sitemap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.contrib.sitemaps.views import sitemap
from django.urls import include, path

from myapp.sitemaps import ArticleSitemap, StaticViewSitemap

sitemaps_all = {'static': StaticViewSitemap, 'snippet': ArticleSitemap}
sitemaps_news = {'snippet': ArticleSitemap}
sitemaps_static = {'static': StaticViewSitemap}

urlpatterns = [
    path('', include('myapp.urls')),
    path('utils/', include('website.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps_all}),
    path('sitemap-news.xml', sitemap, {'sitemaps': sitemaps_news, 'template_name': 'news_sitemap.xml'}),
    path('sitemaps/pages.xml', sitemap, {'sitemaps': sitemaps_static}),
    path('admin/', admin.site.urls),
]
