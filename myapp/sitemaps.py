import calendar
from datetime import datetime
from time import gmtime

import pytz
from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from .models import Article


class StaticViewSitemap(Sitemap):
    def items(self):
        return ['about', 'home', 'main']

    def location(self, item):
        return reverse(item)


class ArticleSitemap(Sitemap):
    def items(self):
        return Article.objects.all()

    def lastmod(self, obj):
        return ''

    def get_urls(self, page=1, site=None, protocol=None):
        protocol = self.get_protocol(protocol)
        domain = self.get_domain(site)
        res = self._urls(page, protocol, domain)
        for url in res:
            url['title'] = url['item'].title
            local_dt = url['item'].published_at
            if local_dt:
                dt_str = str(local_dt)
                utc_dt_str = dt_str.replace(' ','T')
                url['published_at'] = str(utc_dt_str)
                url['keywords'] = url['item'].get_keywords()
        return res
