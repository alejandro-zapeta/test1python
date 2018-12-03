from mimain import install_and_load
try:
    import tinydb;
except:
    tinydb = install_and_load('tinydb')

db = tinydb.TinyDB("segatest.json")

def insertar_usuario(usuario):
    try:
        usuario["usuario"] = usuario["usuario"].trim().lower()
        db.insert(usuario)
        return "OK"
    except Exception as e:
        return str(e)

def listar():
    return db.all()

def logearse(usuario1, pwd1):
    try:
        login = tinydb.Query()
        return db.search((login["usuario"] == usuario1) & (login["pwd"] == pwd1))
    except Exception as e:
        return {"code": 500, "errormsg": str(e)}

def actualizar(usuario1, llave_usuario):
    try:
        login = tinydb.Query()
        db.update(usuario1, login["usuario"] == llave_usuario)
        return "OK"
    except Exception as e:
        return {"code": 500, "errormsg": str(e)}

def obtener_usuario(usuario1):
    return db.search(tinydb.Query()["usuario"] == usuario1)