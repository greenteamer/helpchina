# -*- coding: utf-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

# Create your models here.

class Catalog(MPTTModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)

    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=150, blank=True)

    class Meta:
        verbose_name = u'Разделы Каталога'
        verbose_name_plural = u'Каталог'

    def url(self):
        return "/catalog/"+self.slug+"/"

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return "/catalog/"+self.slug+"/"

class Product(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True, blank=False)
    description = models.TextField()
    price = models.IntegerField()
    weight = models.IntegerField()
    catalog = models.ManyToManyField(Catalog)

    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=150, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Товары'
        verbose_name_plural = u'Наиминования товаров'

    def get_absolute_url(self):
        return '/product/' + self.slug

    def get_image(self):
        return ProductImage.objects.filter(product=self)[0]


class ProductImage(models.Model):
    image = models.ImageField(upload_to="product")
    product = models.ForeignKey(Product, related_name="product_images")

    def __unicode__(self):
        return self.product.name + "-" + self.image.name

    def get_image(self):
        return "/media/%s/" % self.image

    class Meta:
        verbose_name = u'Фото товара'
        verbose_name_plural = u'Фото товара'



class Page(models.Model):
    name = models.CharField(max_length=2000)
    slug = models.SlugField(max_length=150, unique=False, blank=False)
    text = models.TextField()

    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=150, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Страница'
        verbose_name_plural = u'Страницы'

class Article(models.Model):
    name = models.CharField(max_length=200)
    text = models.TextField()
    data = models.DateField(auto_now_add=True)

    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=150, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Статья'
        verbose_name_plural = u'Статьи'


class PageImage(models.Model):
    image = models.ImageField(upload_to="page")
    page = models.ForeignKey(Page)

    def __unicode__(self):
        return self.name

    def __unicode__(self):
        return self.page.name + "-" + self.image.name

    class Meta:
        verbose_name = u'Фото страницы'
        verbose_name_plural = u'Фототографии страниц'


class ArticleImage(models.Model):
    image = models.ImageField(upload_to="article")
    page = models.ForeignKey(Page)

    def __unicode__(self):
        return self.name

    def __unicode__(self):
        return self.article.name + "-" + self.image.name

    class Meta:
        verbose_name = u'Фото статьи'
        verbose_name_plural = u'Фототографии статей'



