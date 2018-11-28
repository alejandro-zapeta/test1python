from flask import Flask
#from manage_api import generate_token
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello XXXX!"
	
@app.route("/rs/generate-token")
def rs_generate_token():
	return ""
	#return generate_token()