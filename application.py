from flask import Flask
#from manage_api import generate_token
from manage_api import prueba
app = Flask(__name__)

def install_and_load(package):
	import imp
	import subprocess
	subprocess.call(['pip', 'install', package])
	f, fname, desc = imp.find_module(package)
	return imp.load(package, f, fname, desc)
	
try:
	import requests;
except:
	requests = install_and_load('requests')

@app.route("/")
def hello():
    return "Hello XXXX!"
	
@app.route("/rs/generate-token")
def rs_generate_token():
	return prueba()
	#return generate_token()