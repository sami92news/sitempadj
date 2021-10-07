from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from .models import Article


def home(request):
    res = """
    <a href="/admin" target="_blank">Admin</a> | <a href="/sitemap.xml" target="_blank">Sitemap</a>
    """
    return HttpResponse(res)


def about(request):
    return HttpResponse('about page')


def article_detail(request, id, slug):
    article = get_object_or_404(Article, pk=id)
    str = f'Title: {article.title}<br>id: {article.id}<br>slug: {article.slug}<br>body: {article.body}'
    return HttpResponse(str)
