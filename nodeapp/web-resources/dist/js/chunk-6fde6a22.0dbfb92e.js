(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fde6a22"],{ee57:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"via-container",attrs:{fluid:""}},[i("div",[i("v-toolbar",{attrs:{height:"30",dark:"",color:"indigo"}},[i("v-spacer"),i("v-toolbar-title",{staticClass:"align-end"},[t._v("Usuarios")]),i("v-spacer")],1),i("v-card",[i("v-layout",[i("v-text-field",{staticStyle:{height:"34px"},attrs:{solo:"",flat:"","prepend-icon":"search",label:"Búsqueda usuarios","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),i("v-btn",{attrs:{to:{name:"usuarios_gestionar"},color:"success",dark:""}},[i("img",{attrs:{src:"static/icons/addrow-2.png",height:"25"}}),t._v("\n                    Nuevo usuario\n                ")])],1)],1),i("v-data-table",{staticClass:"elevation-1 via-tabla",attrs:{headers:t.headers,search:t.search,items:t.usuarios,"rows-per-page-items":[10,25,50,{text:"All",value:-1}]},scopedSlots:t._u([{key:"items",fn:function(e){return[i("td",{staticStyle:{width:"60px"},attrs:{"align-center":""}},[t._v(t._s(e.item.usuario))]),i("td",{attrs:{"align-center":""}},[t._v(t._s(e.item.descripcion))]),i("td",{staticStyle:{width:"30px"},attrs:{"align-center":""}},[t._v(t._s(e.item.margen))]),i("td",{staticStyle:{width:"50px"},attrs:{"align-center":""}},[t._v(t._s(e.item.tiempo_suscripcion))]),i("td",{attrs:{"align-center":""}},[t._v(t._s(e.item.descripcion))]),i("td",{staticStyle:{width:"90px"},attrs:{"align-center":""}},[t._v(t._s(e.item.correo))]),i("td",{staticStyle:{width:"90px","text-align":"right"}},[t._v(t._s(e.item.telefono))]),i("td",{staticStyle:{width:"90px","text-align":"right"}},[t._v(t._s(e.item.tiempo_vigencia_margen))]),i("td",{staticStyle:{width:"90px","text-align":"right"}},[t._v(t._s(e.item.alerta_consumo))]),i("td",{staticStyle:{width:"110px"}},[i("center",[i("img",{staticStyle:{cursor:"pointer"},attrs:{src:"static/icons/edit-3.png",height:"25"},on:{click:function(i){t.editItem(e.item)}}}),i("img",{staticStyle:{cursor:"pointer"},attrs:{src:"static/image/delete.png",height:"25"},on:{click:function(i){t.eliminar(e.item.id_pais)}}})])],1)]}}])})],1)])},a=[],r=i("fbfe"),n=i("bc3a"),c={data(){return{usuarios:[],headers:[{text:"Usuario"},{text:"Nombre cliente"},{text:"Margen"},{text:"Tiempo suscripción"},{text:"Descripción"},{text:"Correo"},{text:"Teléfono"},{text:"Vig. Margen"},{text:"Alerta consumo"},{text:""}]}},created(){var t=this;n.get(r["URI_USUARIO"]).then(function(e){t.usuarios=e.data})}},o=c,l=i("2877"),u=Object(l["a"])(o,s,a,!1,null,null,null);u.options.__file="index.vue";e["default"]=u.exports},fbfe:function(t,e){const i={URI_USUARIO:"https://apicps.azurewebsites.net/rs/usuario/",URI_APP:"https://apicps.azurewebsites.net/rs/"};t.exports=i}}]);
//# sourceMappingURL=chunk-6fde6a22.0dbfb92e.js.map