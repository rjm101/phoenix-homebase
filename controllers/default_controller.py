from google.appengine.api import memcache
import os
import re
import time
import logging
import datetime
import simplejson as json
from google.appengine.ext import webapp
from google.appengine.ext.webapp.mail_handlers import InboundMailHandler
from google.appengine.ext import blobstore
from google.appengine.api.datastore import Key
from google.appengine.api import taskqueue
from google.appengine.api import urlfetch
from google.appengine.api import mail
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext.webapp import template
from google.appengine.runtime.apiproxy_errors import CapabilityDisabledError
from google.appengine.ext.db import BadValueError
from google.appengine.ext import db
from google.appengine.runtime import DeadlineExceededError
from operator import itemgetter
import urllib

# Import local scripts
from controllers import utils
from controllers import datastore
from models import models

class WarmupHandler(webapp.RequestHandler):
	def get(self):
		logging.debug('Warmup Request')
		pass

class DefaultHandler(utils.BaseHandler):
	def get(self):
		path = os.path.join(os.path.dirname(__file__),'../views/index.html')
		self.response.out.write(template.render(path,self.context))

class Product1(utils.BaseHandler):
	def get(self):
		path = os.path.join(os.path.dirname(__file__),'../views/product1.html')
		self.response.out.write(template.render(path,self.context))

class Product2(utils.BaseHandler):
	def get(self):
		path = os.path.join(os.path.dirname(__file__),'../views/product2.html')
		self.response.out.write(template.render(path,self.context))

class Product3(utils.BaseHandler):
	def get(self):
		path = os.path.join(os.path.dirname(__file__),'../views/product3.html')
		self.response.out.write(template.render(path,self.context))

class JSONNavigationHandler(utils.BaseHandler):
	def get(self):
		self.set_request_arguments()
		try:
			self.content = dict(response='Navigation')
			query = datastore.get_navigation(**self.context['request_args'])
			if query is not None:
				self.navigation = query

			self.content['data']=self.navigation

		except Exception, e:
			logging.error(e)
			self.status_code = 500
			self.content['error']=dict(type=e.__class__.__name__, message=str(e))
		finally:
			self.render_json()

class JSONDepartmentHandler(utils.BaseHandler):
	def get(self):
		self.set_request_arguments()
		try:
			self.content = dict(response='Departments')
			query = datastore.get_departments(**self.context['request_args'])
			if query is not None:
				self.departments = query

			self.content['data']=self.departments

		except Exception, e:
			logging.error(e)
			self.status_code = 500
			self.content['error']=dict(type=e.__class__.__name__, message=str(e))
		finally:
			self.render_json()

class JSONCategoryHandler(utils.BaseHandler):
	def get(self):
		self.set_request_arguments()
		try:
			self.content = dict(response='Categories')
			query = datastore.get_categories(**self.context['request_args'])
			if query is not None:
				self.categories = query

			self.content['data']=self.categories

		except Exception, e:
			logging.error(e)
			self.status_code = 500
			self.content['error']=dict(type=e.__class__.__name__, message=str(e))
		finally:
			self.render_json()

class JSONProductHandler(utils.BaseHandler):
	def get(self):
		self.set_request_arguments()
		try:
			self.content = dict(response='Products')
			query = datastore.get_products(**self.context['request_args'])
			if query is not None:
				self.products = query

			self.content['data']=self.products

		except Exception, e:
			logging.error(e)
			self.status_code = 500
			self.content['error']=dict(type=e.__class__.__name__, message=str(e))
		finally:
			self.render_json()

		