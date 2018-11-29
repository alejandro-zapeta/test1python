from mimain import install_and_load
try:
    import tinydb;
except:
    requests = install_and_load('tinydb')

db = tinydb.TinyDB("sega.json")

def insertar_usuario(usuario):
    db.insert(usuario)
    return "OK"

def listar():
    return db.all()

def logearse(usuario1, pwd1):
    login = Query()
    return db.search((login["usuario"] == usuario1) & (login["pwd"] == pwd1))

def obtener_usuario(usuario1):
    return db.search(Query()["usuario"] == usuario1)