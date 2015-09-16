from rest_framework import serializers
from core.models import Product, ProductImage
from core.cart.models import CartItem


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
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'count', 'cart_id')