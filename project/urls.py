from django.conf.urls import include, url
from django.contrib import admin
from rest_framework import routers


from core.views import ProductViewSet, CartitemsViewSet

router = routers.DefaultRouter()
router.register(r'api/products', ProductViewSet)
router.register(r'api/cartitems', CartitemsViewSet)

urlpatterns = [
    # Examples:
    # url(r'^$', 'project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include("core.urls")),

    url(r'^', include(router.urls)),
    url(r'^rest-api/', include('rest_framework.urls', namespace='rest_framework'))

]
