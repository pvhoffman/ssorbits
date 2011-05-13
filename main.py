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

class googleauthv(webapp.RequestHandler):
    def get(self):
        (path, filename) = os.path.split(__file__)
        fn = os.path.join(path, 'googlebc8690495dcb0c72.html')
        fd = open(fn, 'rb');
        self.response.out.write(fd.read())

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
            , ('/googlebc8690495dcb0c72.html', googleauthv)]
        , debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()

