#!/usr/bin/env python
from google.appengine.dist import use_library
use_library('django', '1.2')
import logging
import os
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

#Local scripts
from controllers import default_controller
from controllers import tasks
from controllers import cron

# System URLs
requestWarmUp = '/_ah/warmup'

# JSON service URLs
jsonRequestProducts = '/json/products'
jsonRequestCategories = '/json/categories'
jsonRequestDepartments = '/json/departments'

jsonRequestNavigation = '/json/navigation'

# User Request Endpoint URL for HTML
requestDefault = '/'

# Task URLs
taskProductCollection = '/tasks/product-collection'
taskProductDetailCollection = '/tasks/product-detail-collection'
taskProductDetailCollctionKickoff = '/tasks/product-detail-collection-kickoff'

# CRON URLs
cronProductCollection = '/cron/product-collection'
cronProductDetailCollection = '/cron/product-detail-collection'

application = webapp.WSGIApplication([
	(requestWarmUp, default_controller.WarmupHandler),
	(cronProductCollection, cron.ProductCollection),
	(cronProductDetailCollection, cron.ProductDetailCollection),
	(taskProductCollection, tasks.ProductCollection),
	(taskProductDetailCollctionKickoff, tasks.ProductDetailCollectionKickoff),
	(taskProductDetailCollection, tasks.ProductDetailCollection),
	(jsonRequestProducts,  default_controller.JSONProductHandler),
	(jsonRequestCategories, default_controller.JSONCategoryHandler),
	(jsonRequestDepartments, default_controller.JSONDepartmentHandler),
	(jsonRequestNavigation, default_controller.JSONNavigationHandler),
	(requestDefault, default_controller.DefaultHandler)	
	],debug=True)

def main():
	logging.getLogger().setLevel(logging.DEBUG)
	run_wsgi_app(application)

if __name__ == '__main__':
	main()