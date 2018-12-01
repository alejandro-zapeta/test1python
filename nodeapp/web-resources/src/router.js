import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

function myImport(nameComponent){
  return import("./views/" + nameComponent)
}
function rutaCatalogo(name, tipo){
  var pathX = "/" + name+ "/" + tipo;
  var nameX = name + "_" + tipo;
  return {"path": pathX, "name": nameX, props: true, component: () => myImport(name + "/"+tipo + ".vue") }
}


var misRutas = [
 rutaCatalogo("usuarios", "index"),
 rutaCatalogo("usuarios", "gestionar"),
 rutaCatalogo("dashboard", "dashboard"),
 rutaCatalogo("login", "login"),
];

export default new Router({
  routes: misRutas
})