# -*- coding: utf-8 -*-
from django.shortcuts import render
from core.models import Product, Article, ProductImage, ArticleImage, PageImage, Page
from core.cart.models import CartItem
from django.shortcuts import render_to_response
from django.template import RequestContext
from core.cart import cart

def cart_view(request, template_name="cart/cart.html"):
    cart_id = cart.get_cart_id(request)
    cart_items = CartItem.objects.filter(cart_id=cart_id)

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))