<template>
    <div>
        <br>
        <v-container id="divRegistrarse" class="via-container" fluid>
            <v-card class="elevation-4">
                <v-toolbar height="30" dark color="indigo">
                    <v-spacer></v-spacer>
                    <v-toolbar-title class="align-end">Gestión Usuario</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <v-form ref="formulario">
                        <v-layout row wrap>
                            <via-lbl-frm titulo='Cliente' required='true' class='xs12 md1 miCol' />
                            <v-flex xs12 md5>
                                <v-select clearable class="text-truncate" v-model="usuario.cliente_id" :items="clientes_azure" :rules="[v => !!v || 'Cliente requerido']" item-text="companyProfile.companyName" item-value="id" height="25" background-color="blue lighten-3" color="#81D4FA" required></v-select>
                            </v-flex>
                            <via-lbl-frm titulo='Rol' required='true' class='xs12 md1 miCol' />
                            <v-flex xs12 md5>
                                <v-select v-model="usuario.rol" :items="['Administrador', 'Técnico', 'Cliente']" label="Seleccione el rol" clearable></v-select>
                            </v-flex>
                            <via-lbl-frm titulo='Descripción' required='false' class='xs12 md1 miCol' />
                            <v-flex xs12 md3>
                                <v-text-field solo type="text" class="mr-3" v-model="usuario.descripcion"></v-text-field>
                            </v-flex>
                            <via-lbl-frm titulo='Correo' required='false' class='xs12 md1 miCol' />
                            <v-flex xs12 md2>
                                <v-text-field solo type="text" class="mr-3" v-model="usuario.correo"></v-text-field>
                            </v-flex>
                             <via-lbl-frm titulo='Teléfono' required='false' class='xs12 md1 miCol' />
                            <v-flex xs12 md2>
                                <v-text-field solo type="text" class="mr-3" v-model="usuario.telefono"></v-text-field>
                            </v-flex>
                            <via-lbl-frm titulo='Margen (%)' required='true' class='xs12 md1 miCol' />
                            <v-flex md1 xs12>
                                <v-text-field solo required type="number" class="mr-3" v-model='usuario.margen' :rules="[r => !!r || 'Escriba el margen']">
                                </v-text-field>
                            </v-flex>
                            <via-lbl-frm titulo='Tiempo de suscripción' required='false' class='xs12 md1 miCol' />
                            <v-flex xs12 md2>
                                <v-text-field solo type="text" class="mr-3" v-model="usuario.tiempo_suscripcion"></v-text-field>
                            </v-flex>
                            <via-lbl-frm titulo='Tiempo vigencia margen' required='false' class='xs12 md1 miCol' />
                             <v-flex xs12 md2>
                                <v-text-field solo type="text" class="mr-3" v-model="usuario.tiempo_vigencia_margen"></v-text-field>
                            </v-flex>
                            <via-lbl-frm titulo='Alerta consumo' class='xs12 md1 miCol' />
                            <v-flex md1 xs12>
                                <v-text-field solo required type="number" class="mr-3" v-model='usuario.alerta_consumo' >
                                </v-text-field>
                            </v-flex>
                           
                        </v-layout>
                        <v-layout row wrap>
                            <via-lbl-frm titulo='Usuario' required='true' class='xs12 md1 miCol' />
                            <v-flex xs12 md3>
                                <v-text-field solo required xs12 md4 type="text" class="mr-3" v-model="usuario.usuario">
                                </v-text-field>
                            </v-flex>
                            <via-lbl-frm v-if="!disable" titulo='Contraseña' required='true' class='xs12 md1 miCol' />
                            <v-flex v-if="!disable" xs12 md3>
                                <v-text-field v-model="pwd1" class="mr-3" :rules="[value => !!value || 'Requerido']" :type="show1 ? 'text' : 'password'" name="input-10-1" counter solo></v-text-field>
                            </v-flex>
                            <via-lbl-frm v-if="!disable" titulo='Confirme contraseña' required='false' class='xs12 md1 miCol' />
                            <v-flex v-if="!disable" xs12 md3>
                                <v-text-field v-model="pwd2" class="mr-3" :rules="[value => !!value || 'Requerido']" :type="show2 ? 'text' : 'password'" name="input-10-1" counter solo></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout align-center justify-center row fill-height>
                            <v-btn v-if="!disable" color="success" @click="registrar_usuario">
                                <img src="static/image/save.png" height="25"> Registrarse
                            </v-btn>
                                <v-btn v-else color="primary" @click="editarMisDatos('modificar')">
                                    <img src="static/image/save.png" height="25"> Guardar
                            </v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>

var axios = require("axios");
var alertify = require("alertifyjs");
var md5 = require('js-md5');
var URI = "https://api.partnercenter.microsoft.com/v1/";
var URI_USUARIO = "https://apicps.azurewebsites.net/rs/usuario/";
var mitoken = JSON.parse(localStorage.getItem("token"));
var clientes_copia = [];
var token = mitoken["access_token"];

function encontrar_usuario(idUsuario){
    for (var i = clientes_copia.length - 1; i >= 0; i--) {
        var cliente = clientes_copia[i];
        if(cliente["id"] === idUsuario){
            return cliente;
        }
    }
}

export default {
    data() {
        return {
            "usuario": {},
            "pwd1": "",
            "pwd2": "",
            "clientes_azure": []
        }
    },
    methods: {
        "registrar_usuario": function() {
            if (this.$refs.formulario.validate() === false)
                return;
            if (this.pwd1 !== this.pwd2) {
                alertify.error("La contraseña no coincide con la repetición de la misma.");
                return;
            }
            var usuario = this.usuario;
            var hash = md5.create();
            hash.update(this.pwd1);
            var toSend = Object.assign({}, usuario);
            var clienteEncontrado = encontrar_usuario(toSend["cliente_id"]);

            toSend["pwd"] = hash.hex();
            toSend["nombre_cliente"] = clienteEncontrado["companyProfile"]["companyName"];
            console.log("toSend");
            console.log(JSON.stringify(toSend));
            axios.post(URI_USUARIO + "insertar-usuario", toSend).then(function(response) {
                console.log(response);
                alert("OK");
            });
        }

    },
    created() {
        var vue = this;

        axios.get(URI + "customers", { "headers": { "Authorization": "Bearer " + token, "accept": "application/json" } })
            .then(function(response) {
                console.log("customers");
                console.log(response);
                vue.clientes_azure = response.data.items;
                clientes_copia = response.data.items.slice(0);
            }).catch(function(error) {
                console.log("error " + error);
            });

    }
}
</script>