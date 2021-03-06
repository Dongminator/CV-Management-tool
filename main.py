import sys

from secrets import SESSION_KEY
from webapp2 import WSGIApplication, Route

from profile import UserProfile

if 'lib' not in sys.path:
    sys.path[0:0] = ['lib']

# Modification to fit the application configuration
# The different is the settings of UserProfile
# webapp2 config
app_config = {
  'webapp2_extras.sessions': {
    'cookie_name': '_comp3001teamf_app_session',
    'secret_key': SESSION_KEY
  },
  'webapp2_extras.auth': {
    # Use custom user profile
    'user_model': UserProfile,
    'user_attributes': []
  }
}

# Modification follow the instruction of using simpleauth library http://code.google.com/p/gae-simpleauth/
# Define all the routes of application here
routes = [
    # Handle root page
    Route('/', handler='base.RootHandler'),  
    # Handle log out
    Route('/logout', handler='login.LoginHandler:logout', name='logout'),
    # Handle log in
    Route('/auth/<provider>', handler='login.LoginHandler:_simple_auth', name='auth_login'),
    Route('/auth/<provider>/callback', handler='login.LoginHandler:_auth_callback', name='auth_callback'),
    # Handle user home page
    Route('/homepage', handler='home.HomePageHandler', name='homepage'),
    # Handle PDF export
    Route('/export', handler='export.PDFExportHandler', name='export')
]

app = WSGIApplication(routes, config=app_config, debug=True)
