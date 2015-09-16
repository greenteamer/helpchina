# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('text', models.TextField()),
                ('data', models.DateField(auto_now_add=True)),
                ('meta_title', models.CharField(max_length=60, blank=True)),
                ('meta_description', models.CharField(max_length=150, blank=True)),
            ],
            options={
                'verbose_name': '\u0421\u0442\u0430\u0442\u044c\u044f',
                'verbose_name_plural': '\u0421\u0442\u0430\u0442\u044c\u0438',
            },
        ),
        migrations.CreateModel(
            name='ArticleImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'article')),
            ],
            options={
                'verbose_name': '\u0424\u043e\u0442\u043e \u0441\u0442\u0430\u0442\u044c\u0438',
                'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441\u0442\u0430\u0442\u0435\u0439',
            },
        ),
        migrations.CreateModel(
            name='Catalog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(max_length=200)),
                ('meta_title', models.CharField(max_length=60, blank=True)),
                ('meta_description', models.CharField(max_length=150, blank=True)),
                ('lft', models.PositiveIntegerField(editable=False, db_index=True)),
                ('rght', models.PositiveIntegerField(editable=False, db_index=True)),
                ('tree_id', models.PositiveIntegerField(editable=False, db_index=True)),
                ('level', models.PositiveIntegerField(editable=False, db_index=True)),
                ('parent', mptt.fields.TreeForeignKey(related_name='children', blank=True, to='core.Catalog', null=True)),
            ],
            options={
                'verbose_name': '\u0420\u0430\u0437\u0434\u0435\u043b\u044b \u041a\u0430\u0442\u0430\u043b\u043e\u0433\u0430',
                'verbose_name_plural': '\u041a\u0430\u0442\u0430\u043b\u043e\u0433',
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=2000)),
                ('slug', models.SlugField(max_length=150)),
                ('text', models.TextField()),
                ('meta_title', models.CharField(max_length=60, blank=True)),
                ('meta_description', models.CharField(max_length=150, blank=True)),
            ],
            options={
                'verbose_name': '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430',
                'verbose_name_plural': '\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u044b',
            },
        ),
        migrations.CreateModel(
            name='PageImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'page')),
                ('page', models.ForeignKey(to='core.Page')),
            ],
            options={
                'verbose_name': '\u0424\u043e\u0442\u043e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b',
                'verbose_name_plural': '\u0424\u043e\u0442\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=150)),
                ('slug', models.SlugField(unique=True, max_length=150)),
                ('description', models.TextField()),
                ('price', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('meta_title', models.CharField(max_length=60, blank=True)),
                ('meta_description', models.CharField(max_length=150, blank=True)),
                ('catalog', models.ManyToManyField(to='core.Catalog')),
            ],
            options={
                'verbose_name': '\u0422\u043e\u0432\u0430\u0440\u044b',
                'verbose_name_plural': '\u041d\u0430\u0438\u043c\u0438\u043d\u043e\u0432\u0430\u043d\u0438\u044f \u0442\u043e\u0432\u0430\u0440\u043e\u0432',
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(upload_to=b'product')),
                ('product', models.ForeignKey(related_name='product_images', to='core.Product')),
            ],
            options={
                'verbose_name': '\u0424\u043e\u0442\u043e \u0442\u043e\u0432\u0430\u0440\u0430',
                'verbose_name_plural': '\u0424\u043e\u0442\u043e \u0442\u043e\u0432\u0430\u0440\u0430',
            },
        ),
        migrations.AddField(
            model_name='articleimage',
            name='page',
            field=models.ForeignKey(to='core.Page'),
        ),
    ]
