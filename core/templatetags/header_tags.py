# -*- coding: utf-8 -*-
from django import template
from core.models import Catalog
register = template.Library()


def top_menu(context, request):

    return {
        'user': request.user,
        'request': request
    }
register.inclusion_tag('core/tags/top_menu.html', takes_context=True)(top_menu)

def catalog(context, request):

    return  {'nodes': Catalog.objects.all()}

register.inclusion_tag('core/tags/catalog.html', takes_context=True)(catalog)