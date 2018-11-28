from flask import Flask
#from manage_api import generate_token
from manage_api import prueba
import requests;
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello XXXX!"
	
@app.route("/rs/generate-token")
def rs_generate_token():
	return prueba()
	#return generate_token()