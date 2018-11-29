from flask import Flask, jsonify, request
from manage_api import generate_token
import miapp
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello XXXX!"
	
@app.route("/rs/generate-token", methods=['GET'])
def rs_generate_token():
    try:
        return jsonify(generate_token())
    except Exception as e:
        return str(e)

@app.route("/rs/usuario/insertar-usuario", methods=['POST'])
def rs_insertar_usuario():
    return insertar_usuario(request.json)

@app.route("/rs/usuario/", methods=['GET'])
def rs_listar():
    return listar()

@app.route("/rs/usuario/logearse", methods=['POST'])
def rs_logearse():
    contenido = request.json
    return logearse(contenido["usuario"], contenido["pwd"])

@app.route("/rs/usuario/<usuario1>/", methods=['GET'])
def rs_obtener_usuario(usuario1):
    return obtener_usuario(usuario1)