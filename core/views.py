# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response, RequestContext


def index_view(request,template_name="core/index.html"):

    return render_to_response(template_name, locals(), context_instance=RequestContext(request))