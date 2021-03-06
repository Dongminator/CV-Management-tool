# This file contain secret information of the application
# Modification to fit the specific application follow the instruction from http://code.google.com/p/gae-simpleauth/
import os
SESSION_KEY = os.urandom(64)

# Google APIs
GOOGLE_APP_ID = '923873026763.apps.googleusercontent.com'
GOOGLE_APP_SECRET = 'FJNkfkq_NzB-2wBVNHtHVH4X'

# Facebook auth apis
FACEBOOK_APP_ID = '384280531660662'
FACEBOOK_APP_SECRET = '9af3bfc23db28da79a2a716f3c7d5980'

# https://www.linkedin.com/secure/developer
LINKEDIN_CONSUMER_KEY = 'hwibcvxtja5d'
LINKEDIN_CONSUMER_SECRET = 'LsyQEud5vrja01R3'

# https://manage.dev.live.com/AddApplication.aspx
# https://manage.dev.live.com/Applications/Index
WL_CLIENT_ID = '00000000440E56AD'
WL_CLIENT_SECRET = 'IQpGMHKq973COsGZwKoZzVsCC1CspWwk'

# https://dev.twitter.com/apps
TWITTER_CONSUMER_KEY = '1sPakpTOs2UAiKrLzDCgg'
TWITTER_CONSUMER_SECRET = 'xsSB3ryPPUzttA2mIhrNzo1zlXtvfa2QKYXTNjkgfKc'

# Modification here because of the application doesn't need OpenID authentication
# config that summarizes the above
AUTH_CONFIG = {
  # OAuth 2.0 providers
  'google'      : (GOOGLE_APP_ID, GOOGLE_APP_SECRET,
                  'https://www.googleapis.com/auth/userinfo.profile'),
  'facebook'    : (FACEBOOK_APP_ID, FACEBOOK_APP_SECRET,
                  'user_about_me'),
  'windows_live': (WL_CLIENT_ID, WL_CLIENT_SECRET,
                  'wl.signin'),

  # OAuth 1.0 providers don't have scopes
  'twitter'     : (TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET),
  'linkedin'    : (LINKEDIN_CONSUMER_KEY, LINKEDIN_CONSUMER_SECRET),
}
