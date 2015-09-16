# -*- coding: utf-8 -*-
from core.models import Product, Page, ProductImage, Article, ArticleImage, Catalog
from django.shortcuts import render, render_to_response, RequestContext
from rest_framework import viewsets
from core.serializers import ProductSerializer, CartitemsSerializer
from core.cart.models import CartItem
from core.cart import cart
from django.http import HttpResponseRedirect, HttpResponse
import json

def add_to_cart(request):
    id = request.POST['id']
    product = Product.objects.get(id=id)
    cart_id = cart.set_cart_id(request)
    # parametr_price = request.POST['parametr_price']
    # parametr = ProductParametr.objects.get(product=product, price=parametr_price)

    try:
        tmp_item = CartItem.objects.get(cart_id=cart_id, product=product)
        tmp_item.count += int(request.POST['count'])
        tmp_item.save()
    except:
        cartItem = CartItem()
        cartItem.product = product
        cartItem.count = request.POST['count']
        cartItem.cart_id = cart_id
        cartItem.save()

def indexView(request, template_name="core/index.html"):
    products = Product.objects.all()
    page = Page.objects.all()
    slides = ProductImage.objects.all()

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def product_view(request, slug, template_name="core/product.html"):

    product = Product.objects.get(slug=slug)
    # category = product.category.all()[0]
    # request.breadcrumbs([(category.name, category.url()), (product.name, request.path_info)])
    # list_parametr = ProductParametr.objects.filter(product=product)
    # parametr = ProductParametr.objects.get(product=product, is_main=True)
    # list_image = ProductImage.objects.filter(product=product)

    if request.method == 'POST':
        if "parametr_weight" in request.POST:
            parametr = Product.objects.get(product=product, weight=request.POST['parametr_weight'])
        else:
            add_to_cart(request)

    # tmp_post = request.POST

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def catalog_view(request, slug,  template_name="core/catalog.html"):
    catalog = Catalog.objects.get(slug=slug)
    products = Product.objects.filter(catalog=catalog)

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def page_view(request, slug,  template_name="core/page.html"):
    page = Page.objects.get(slug=slug)

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))


def article_view(request, id, template_name="core/article.html"):
    article = Article.objects.get(id=id)

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))


# ViewSets define the view behavior.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartitemsViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartitemsSerializer


def addtocart_view(request):
    add_to_cart(request)
    data = json.dumps({
    })
    return HttpResponse(data, content_type="application/json")