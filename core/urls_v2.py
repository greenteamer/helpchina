from django.conf import os
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings


urlpatterns = patterns('core.views',

    url(r'^get-user-cartitems/$', 'getcartitems'),
)
