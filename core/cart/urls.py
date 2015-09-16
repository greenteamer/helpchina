# -*- coding: utf-8 -*-
#!/usr/bin/env python

from django.conf.urls import patterns, include, url

urlpatterns = patterns('core.cart.views',


    url(r'cart/$', "cart_view"),
)
