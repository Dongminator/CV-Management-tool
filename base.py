import webapp2

from webapp2_extras import auth, sessions, jinja2
from jinja2.runtime import TemplateNotFound

# Modify from the BaseRequestHandler from the example of http://code.google.com/p/gae-simpleauth/
class BaseHandler(webapp2.RequestHandler):
    def dispatch(self):
        # Get a session store for this request.
        self.session_store = sessions.get_store(request=self.request)
        try:
            # Dispatch the request.
            webapp2.RequestHandler.dispatch(self)
        finally:
            # Save all sessions.
            self.session_store.save_sessions(self.response)
  
    @webapp2.cached_property    
    def jinja2(self):
        # Returns a Jinja2 renderer cached in the app registry
        return jinja2.get_jinja2(app=self.app)
    
    @webapp2.cached_property
    def session(self):
        # Returns a session using the default cookie key
        return self.session_store.get_session()
    
    @webapp2.cached_property
    def auth(self):
        return auth.get_auth()
    
    @webapp2.cached_property
    def current_user(self):
        # Returns currently logged in user
        user_dict = self.auth.get_user_by_session()
        return self.auth.store.user_model.get_by_id(user_dict['user_id'])
    
    @webapp2.cached_property
    def logged_in(self):
        return self.auth.get_user_by_session() is not None
    
    # Modification here to fit the template to be rendered in jinja2
    def render(self, template_name, template_vars={}):
        # Preset values for the template
        values = {
            'url_for': self.uri_for,
            'logged_in': self.logged_in
        }
        # Add manually supplied template values
        values.update(template_vars)
        # read the template or 404
        try:
            self.response.write(self.jinja2.render_template(template_name, **values))
        except TemplateNotFound:
            self.abort(404)
            
    def head(self, *args):
        pass

# Handler the first page
class RootHandler(BaseHandler):
    def get(self):
        self.render('index.html')
