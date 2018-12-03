from flask import Flask, jsonify, request, send_from_directory
from manage_api import generate_token
from miapp import insertar_usuario, listar, logearse, obtener_usuario, actualizar
from mimain import install_and_load
import os

try:
    import flask_cors;
except:
    flask_cors = install_and_load('flask_cors')

app = Flask(__name__)
flask_cors.CORS(app)

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)

@app.route("/", methods=['GET'])
def hello():
    return send_from_directory(root, 'index.html')
	
@app.route("/rs/generate-token", methods=['GET'])
def rs_generate_token():
    try:
        return jsonify(generate_token())
    except Exception as e:
        return str(e)

@app.route("/rs/usuario/insertar-usuario", methods=['POST'])
def rs_insertar_usuario():
    try:
        return insertar_usuario(request.json)
    except Exception as e:
        return str(e)

@app.route("/rs/usuario/<llave_usuario>/actualizar-usuario", methods=['POST'])
def rs_actualizar_usuario(llave_usuario):
    try:
        return actualizar(request.json, llave_usuario)
    except Exception as e:
        return str(e)

@app.route("/rs/usuario/", methods=['GET'])
def rs_listar():
    try:
        return jsonify(listar())
    except Exception as e:
        return str(e)

@app.route("/rs/usuario/logearse", methods=['POST'])
def rs_logearse():
    try:
        contenido = request.json
        return jsonify(logearse(contenido["usuario"], contenido["pwd"]))
    except Exception as e:
        return str(e)


@app.route("/rs/usuario/<usuario1>/", methods=['GET'])
def rs_obtener_usuario(usuario1):
    try:
        return jsonify(obtener_usuario(usuario1))
    except Exception as e:
        return str(e)
