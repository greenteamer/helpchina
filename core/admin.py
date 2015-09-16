# -*- coding: utf-8 -*-
from django.contrib import admin
from core.models import Product, Page, ProductImage, PageImage, ArticleImage, Article, Catalog

class ProductImageAdmin(admin.StackedInline):
    """Добавление изображений продукта"""
    model = ProductImage
    extra = 0


class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(Product, ProductAdmin)
admin.site.register(Page)
admin.site.register(ProductImage)
admin.site.register(PageImage)
admin.site.register(Article)
admin.site.register(ArticleImage)
admin.site.register(Catalog)