import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext.webapp import template

from sun import View as sunv
from mercury import View as mercuryv
from venus import View as venusv
from moon import View as earthmoonv
from mars import View as marsv
from jupiter import View as jupiterv
from saturn import View as saturnv
from uranus import View as uranusv
from neptune import View as neptunev

#stupid hack for favicon.ico & not having time to figure out how to do it in the app.yaml

class favicon(webapp.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'image/x-icon'
        (p, f) = os.path.split(__file__)
        f = os.path.join(p, 'favicon.ico')
        fd = open(f, 'rb')
        self.response.out.write(fd.read())
        fd.close()

application = webapp.WSGIApplication(
		[('/', sunv)
			, ('/sun', sunv)
			, ('/mercury', mercuryv)
			, ('/venus', venusv)
			, ('/moon', earthmoonv)
			, ('/mars', marsv)
			, ('/neptune', neptunev)
			, ('/uranus', uranusv)
			, ('/saturn', saturnv)
			, ('/jupiter', jupiterv)
                        , ('/favicon.ico', favicon)]
		, debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()

