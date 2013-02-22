import json

from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.pagesizes import A4
from xml.sax.saxutils import escape

from base import BaseHandler

# Alignment
# TA_LEFT = 0
# TA_CENTER = 1
# TA_RIGHT = 2
# TA_JUSTIFY = 4

# Extract cv from current cv follow by title
def extractCV(cv, currcv, cv_title):
    cv_ob = json.loads(cv)
    currcv_ob = json.loads(currcv)
    extract = {}
    category_list = []
    extract_list = []
    
    extract['header'] = cv_ob['header']
    
    # Extract from the total cv by label of current cv
    for cv_item in currcv_ob['currentcv']:
        if cv_title == cv_item['title']:
            extract_list = cv_item['content']
    
    # Extract category and all the contents from the total cv 
    for dict_e in extract_list:
        for dict_t in cv_ob['category']:
            if dict_e['category'] == dict_t['id']:
                s_category = {}
                s_category['title'] = dict_t['title']
                s_category['item'] = []
                for order in dict_e['order']:
                    for item in dict_t['item']:
                        if order == item['id']:
                            s_category['item'].append(item)
                category_list.append(s_category)
                
    extract['category'] = category_list
    # Return a json string define the cv
    return escape(json.dumps(extract))

# This class is used to generate the PDF file
class PDFGenerate():
    # Elements of a PDF page
    page_elements = []
    # The document to be generated (cv)
    document = None
    # The template to form a PDF document
    template = None

    def getDocument_str(self, document_str):
        self.document = json.loads(document_str)

    def getTemplate_str(self, template_str):
        self.template = json.loads(template_str)

    def getTemplate(self, template_file):
        temp = open(template_file, "r")
        self.template = json.load(temp)      
        temp.close()

    def getDocument(self, document_file):
        temp = open(document_file, "r") 
        self.document = json.load(temp)
        temp.close()
        
    def _getParaStyle(self, paragraph_type):
        style_set = self.template[paragraph_type]
        style = ParagraphStyle(name=paragraph_type, **style_set)
        return style

    def generate_page_elements(self):
        ''' Style '''
        header_style = self._getParaStyle('header')
        header_item_style = self._getParaStyle('header-item')
        profile_item_style = self._getParaStyle('profile-item')
        sub_category_item_style = self._getParaStyle('category-sub-item')
        category_item_style = self._getParaStyle('category-item')
        category_style = self._getParaStyle('category')
        
        ''' Header '''
        # Name on cv page
        self.page_elements.append(Paragraph(self.document['header']['name'], header_style))
        # Phone and address        
        self.page_elements.append(Paragraph("Address: "+self.document['header']['address'],header_item_style))        
        self.page_elements.append(Paragraph("Phone: "+self.document['header']['phone'],header_item_style))
        
        ''' Page '''
        for cat in self.document['category']:
            self.page_elements.append(Paragraph(cat['title'],category_style))
            for items in cat['item']:
                # If category is profile
                if cat['title'] == 'Profile' or cat['title'] == 'PROFILE':
                    self.page_elements.append(Paragraph(items['content'],profile_item_style))
                # Other wise
                else:
                    self.page_elements.append(Paragraph(items['description'],sub_category_item_style))
                    self.page_elements.append(Paragraph(items['content'],category_item_style))
        self.page_elements.insert(0,Spacer(0,10))

# Handle the request to generate PDF file
class PDFExportHandler(BaseHandler):
    cv_title = ''
    template_name = ''
    
    def get(self):
        if self.logged_in:
            user = self.current_user
            # Get the title of current cv
            if self.request.get('title') != '':
                self.cv_title = self.request.get('title')
            # Get the name of the template
            if self.request.get('template') != '':
                self.template_name = self.request.get('template')
            # Extract cv from total cv and current cv
            document = extractCV(user.cv, user.currcv, self.cv_title)
            # Create a generator
            generator = PDFGenerate()
            generator.getDocument_str(document)
            # TODO: will add more styles in the future
            if self.template_name == 'Classic':
                # classic style
                generator.getTemplate('json/classic.json')
            if self.template_name == 'Modern':
                # Modern style
                generator.getTemplate('json/modern.json')
            generator.generate_page_elements()
            
            # Response a pdf file
            self.response.headers['Content-Type'] = 'application/pdf'
            self.response.headers['Content-Disposition'] = 'attachment; filename=cv.pdf'
            doc = SimpleDocTemplate(self.response.out, pagesize=A4) 
            # Generate PDF
            doc.build(generator.page_elements)
        else:
            self.redirect('/')
