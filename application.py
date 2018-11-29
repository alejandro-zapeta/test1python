from flask import Flask
from flask import jsonify
from manage_api import generate_token
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello XXXX!"
	
@app.route("/rs/generate-token")
def rs_generate_token():
    try:
        return jsonify(generate_token())
    except Exception as e:
        return str(e)