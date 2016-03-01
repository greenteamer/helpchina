# -*- coding: utf-8 -*-
from rest_framework import serializers
from core.models import Product, ProductImage
from core.cart.models import CartItem
from menu.models import MenuItem
import json


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ('id', 'name', 'url', 'parent')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('image',)


# Serializers define the API representation.
class ProductSerializer(serializers.ModelSerializer):
    product_images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'slug', 'description', 'weight', 'price', 'product_images')


class CartitemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False, read_only=True)
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'count', 'cart_id')



def serializeCartItems(cartitems):
    list = []
    print cartitems
    for item in cartitems:
        # получаем все фотки продукта картитема
        images = ProductImage.objects.filter(product=item.product)
        list_images = []
        # собираем список объектов изображений
        # этого продукта в удобный для json.dumps
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
    return data