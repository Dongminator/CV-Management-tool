from base import BaseHandler

# Handle the main home page
class HomePageHandler(BaseHandler):
    # Render the home page
    def get(self):
        if self.logged_in:
            self.render('homepage.html',{'user':self.current_user})
        else:
            self.redirect('/')

    # Handle post request from the user when user change something
    def post(self):
        if self.logged_in:
            user = self.current_user
            if self.request.get('cv') != '':
                user.cv = self.request.get('cv')
            if self.request.get('currcv') != '':
                user.currcv = self.request.get('currcv')
            # Put this change to the Data store
            user.put()
        else:
            self.redirect('/')
