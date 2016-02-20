# -*- coding: utf-8 -*-
from core.models import Product
from rest_framework import viewsets
from core.serializers import *
from core.cart.models import CartItem
from menu.models import MenuItem

from rest_framework.permissions import IsAuthenticated


# ViewSets define the view behavior.
class MenuItemsViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartitemsViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartitemsSerializer
    permission_classes = [IsAuthenticated]
