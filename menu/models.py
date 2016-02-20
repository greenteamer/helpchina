# -*- coding: utf-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey


class MenuItem(MPTTModel):
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    parent = TreeForeignKey('self', related_name='children', blank=True, null=True)

    class Meta:
        verbose_name = u'Пункт Меню'
        verbose_name_plural = u'Меню'

    def __unicode__(self):
        return self.name
