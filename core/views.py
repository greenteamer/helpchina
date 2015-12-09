# -*- coding: utf-8 -*-
from core.models import Product, Page, ProductImage, Article, ArticleImage, Catalog
from django.shortcuts import render, render_to_response, RequestContext
from rest_framework import viewsets
from core.serializers import ProductSerializer, CartitemsSerializer
from core.cart.models import CartItem
from core.cart import cart
from django.core.mail import send_mail
from django.http import HttpResponseRedirect, HttpResponse
from project.settings_local import ADMIN_EMAIL
import json

from django.contrib.auth.models import User
import random
# from django.contrib.auth import

from rest_framework.permissions import IsAuthenticated

def create_user(username):
    user = User()
    user.username = username
    password = ''
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    for a in range(7):
        password += characters[random.randint(0, len(characters)-1)]

    user.set_password(password)
    user.save()
    return user

def add_to_cart(request):
    id = request.POST['id']
    product = Product.objects.get(id=id)
    cart_id = cart.get_cart_id(request)
    # parametr_price = request.POST['parametr_price']
    # parametr = ProductParametr.objects.get(product=product, price=parametr_price)

    try:
        tmp_item = CartItem.objects.get(cart_id=cart_id, product=product)
        tmp_item.count += int(request.POST['count'])
        tmp_item.save()
        return tmp_item
    except:
        cartItem = CartItem()
        cartItem.product = product
        cartItem.count = request.POST['count']
        cartItem.cart_id = cart_id
        cartItem.save()
        return cartItem


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
    permission_classes = [IsAuthenticated]


def addtocart_view(request):
    cart_item = add_to_cart(request)
    data = json.dumps({
        'id': cart_item.id,
        'product': cart_item.product.id,
        'count': cart_item.count,
        'cart_id': cart_item.cart_id
    })
    return HttpResponse(data, content_type="application/json")


def change_count_view(request):
    count = request.POST["count"]
    id = request.POST["id"]
    tmp_item = CartItem.objects.get(id=id)
    tmp_item.count = count
    tmp_item.save()
    data = json.dumps({})
    return HttpResponse(data, content_type="application/json")


def getcartitems(request):
    cart_id = cart.get_cart_id(request)
    cartitems = CartItem.objects.filter(cart_id=cart_id)

    list = []
    for item in cartitems:

        # получаем все фотки продукта картитема
        images = ProductImage.objects.filter(product=item.product)
        list_images = []
        # собираем список объектов изображений этого продукта в удобный для json.dumps
        for image in images:
            list_images.append({
                'image': '%s' % image.get_image()
            })

        # добавляем в список картитемов объект при каждой итерации
        list.append({
            'id': item.id,
            'product': {
                'id': item.product.id,
                'name': item.product.name,
                'description': item.product.description,
                'price': item.product.price,
                "product_images": list_images
            },
            'count': item.count,
            'cart_id': item.cart_id
        })

    data = json.dumps(list)
    return HttpResponse(data, content_type="application/json")


def deletecartitem(request):

    id = request.POST['id']
    cartitem = CartItem.objects.get(id=id)
    cartitem.delete()

    data = json.dumps({})
    return HttpResponse(data, content_type="application/json")


def submitorder(request):

    if request.method == 'POST':

        email = request.POST['email']
        name = request.POST['name']
        phone = request.POST['phone']

        username = email.split('@')[0]
        new_user = create_user(username)

        cart_id = cart.get_cart_id(request)
        cart_items = CartItem.objects.filter(cart_id=cart_id)
        cart_items_text = ''
        for item in cart_items:
            cart_items_text += item.product.name

        subject = u'заявка от %s' % name
        message = u'Имя: %s \n телефон: %s\n email: %s \n продукты: %s' % (name, phone, email, cart_items_text)
        send_mail(subject, message, 'halturin77@gmail.com', [ADMIN_EMAIL], fail_silently=False)

        subject = u'заявка от %s' % name
        message = u'С уважением компания Рокит'
        send_mail(subject, message, 'halturin77@gmail.com', [email], fail_silently=False)


    data = json.dumps({})
    return HttpResponse(data, content_type="application/json")
