# secrets store the secret information of the application
import secrets

# Library import for authentication
from simpleauth import SimpleAuthHandler

from base import BaseHandler

# Modify from LoginHandler in example from http://code.google.com/p/gae-simpleauth/
class LoginHandler(BaseHandler, SimpleAuthHandler):
    
    # Enable optional OAuth 2.0 CSRF guard
    OAUTH2_CSRF_STATE = True
    
    # User attributes after logging in
    USER_ATTRS = {
        'facebook' : {
          'id'     : lambda idf: ('avatar_url','http://graph.facebook.com/{0}/picture?type=large'.format(idf)),
          'name'   : 'name',
          'link'   : 'link'
        },
        'google'   : {
          'picture': 'avatar_url',
          'name'   : 'name',
          'link'   : 'link'
        },
        'windows_live': {
          'avatar_url': 'avatar_url',
          'name'      : 'name',
          'link'      : 'link'
        },
        'twitter'  : {
          'profile_image_url': 'avatar_url',
          'screen_name'      : 'name',
          'link'             : 'link'
        },
        'linkedin' : {
          'picture-url'       : 'avatar_url',
          'first-name'        : 'name',
          'public-profile-url': 'link'
        },
    }

    # Modification here : need to change to fit the User profile 
    # Define what to do when user sign in
    def _on_signin(self, data, auth_info, provider):
        # The authentication ID unique for each user
        auth_id = '%s:%s' % (provider, data['id'])
        # get user attribute defined above
        _attrs = self._to_user_attrs(data, self.USER_ATTRS[provider])
        
        # More attributes added to the User Profile
        # Default attribute if user first login
        add_attrs = {}
        add_attrs['cv'] = '{"header": {"name": "Please enter your full name","phone": "Please enter your contact number","address": "Please enter your address","gender": "male"},"category": []}'
        add_attrs['currcv'] = '{"currentcv": []}'
        add_attrs['hasStarted'] = 'False'
        
        # Check if the user exists
        user = self.auth.store.user_model.get_by_auth_id(auth_id)
        
        # If existing a user
        if user:
            user.hasStarted = 'True'
            user.populate(**_attrs)
            user.put()
            self.auth.set_session(self.auth.store.user_to_dict(user))
        else:
            # Update current user
            if self.logged_in:
                u = self.current_user
                user.hasStarted = 'True'
                u.populate(**_attrs)
                u.add_auth_id(auth_id)
            else:
                # Create a new user
                _attrs.update(add_attrs)
                ok, user = self.auth.store.user_model.create_user(auth_id, **_attrs)
                if ok:
                    self.auth.set_session(self.auth.store.user_to_dict(user))

        # Redirect to the home page
        self.redirect('/homepage')

    def logout(self):
        self.auth.unset_session()
        self.redirect('/')

    def handle_exception(self, exception, debug):
        self.render('error.html', {'exception': exception})
    
    # Must have to use Simple Authentication
    def _callback_uri_for(self, provider):
        return self.uri_for('auth_callback', provider=provider, _full=True)
    
    # Must have to use Simple Authentication
    def _get_consumer_info_for(self, provider):
        return secrets.AUTH_CONFIG[provider]
    
    # Generate user attribute from USER_ATTRS
    def _to_user_attrs(self, data, attrs_map):
        user_attrs = {}
        for k, v in attrs_map.iteritems():
            attr = (v, data.get(k)) if isinstance(v, str) else v(data.get(k))
            user_attrs.setdefault(*attr)
        return user_attrs
