from google.appengine.ext import ndb
# Use the user model of auth webapp2
import webapp2_extras.appengine.auth.models as auth_models

# Class defined the user profile
class UserProfile(auth_models.User):
    # This variable store the whole cv
    cv = ndb.TextProperty()
    # This variable store currently working cv
    currcv = ndb.TextProperty()
    # The variable for determine to skip tutorial
    hasStarted = ndb.StringProperty()