from django.db import models
from django.utils.text import slugify


class Article(models.Model):
    title = models.CharField(max_length=80)
    slug = models.SlugField(blank=True, null=True)
    body = models.TextField()
    published_at = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_keywords(self):
        return '1,2'

    def get_absolute_url(self):
        return f'/about/{self.id}/{self.slug}'
