# -*- coding: utf-8 -*-
from django.db import models
from core.models import Product
# from django.contrib.auth.models import User



class CartItem(models.Model):
    product = models.ForeignKey(Product)
    # user = models.ForeignKey(Account)
    count = models.IntegerField()
    cart_id = models.CharField(max_length=240)


    class Meta:
        verbose_name = u'Объект корзины'
        verbose_name_plural = u'Корзина'

    def total_price(self):
        return self.count * self.parametr.price

    def url(self):
        return self.product.url()

    def __unicode__(self):
        return u"cartItem - " + self.product.name

