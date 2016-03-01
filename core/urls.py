from django.conf import os
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings


urlpatterns = patterns('core.views',
    url(r'^admin/', include(admin.site.urls)),



    # url(r'^$', 'indexView'),
    url(r'^$', 'indexView'),    
    url(r'^product/(?P<slug>[-\w]+)/$', 'product_view'),
    url(r'^catalog/(?P<slug>[-\w]+)/$', 'catalog_view'),
    url(r'^page/(?P<slug>[-\w]+)/$', 'page_view'),
    url(r'^article/(?P<id>[-\w]+)/$', 'article_view'),
    url(r'^addtocart/$', 'addtocart_view'),
    url(r'^change-count/$', 'change_count_view'),
)
#
# if settings.DEBUG:
#     urlpatterns += patterns('',
#     url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
#         {'document_root': settings.STATIC_ROOT}),
#     url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
#         {'document_root': settings.MEDIA_ROOT}),
#         )