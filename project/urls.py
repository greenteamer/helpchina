from django.conf.urls import include, url, patterns
from django.contrib import admin
from rest_framework import routers
from django.conf import settings



from core.view_sets import *

router = routers.DefaultRouter()
router.register(r'api/products', ProductViewSet)
router.register(r'api/cartitems', CartitemsViewSet)
router.register(r'api/menuitems', MenuItemsViewSet)


urlpatterns = [
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include("core.urls")),
    url(r'^api/v2/', include("core.urls_v2")),

    url(r'^', include(router.urls)),
    url(r'^rest-api/', include('rest_framework.urls', namespace='rest_framework'))

]

if settings.DEBUG:
    urlpatterns += patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT}),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.MEDIA_ROOT}),
        )