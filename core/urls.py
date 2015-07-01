# -*- coding: utf-8 -*-
#!/usr/bin/env python

from django.conf.urls import patterns, include, url

urlpatterns = patterns('core.views',

    # Главная страница
    url(r'$', "index_view"),


)
