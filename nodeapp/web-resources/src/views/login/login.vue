<template>
    <div id="">
        <br>
        <br>
        <br>
        <!--<v-app>-->
        <!--<v-content>-->
        <v-container id="miapp" fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex style="background-color: white" xs12 sm8 md4 lg4>
                    <v-card class="elevation-1 pa-3">
                        <v-card-text>
                            <div class="layout align-content-center">
                                <img src="@/imgs/cloud.png" width="100" height="100">
                                <h1 class="flex my-4">&nbsp;&nbsp; Consumo Azure </h1>
                            </div>
                            <v-form>
                                <v-text-field label="Ingrese su usuario" name="login" v-model="usuario" append-icon="person" type="text" @keyup.enter="login" solo :rules="[value => !!value || 'Requerido']">
                                </v-text-field>
                                <br>
                                <v-text-field v-model="password" @keyup.enter="login" label="Ingrese su contraseña" :rules="[value => !!value || 'Requerido']" type="password" name="input-10-1" counter solo @click:append="show1 = !show1">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn block color="primary" @click="login">Logearse</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <!--</v-content>-->
        <!--</v-app>-->
    </div>
</template>
<script>
var md5 = require('js-md5');
var axios = require("axios");
var alertify = require("alertifyjs");
var constantes = require("../../constantes.js");
alertify.set('notifier', 'position', 'top-right');
export default {
    data() {
        return {
            "usuario": "",
            "password": "",
            "show1": true
        }
    },
    methods: {
        "login": function() {
            var hash = md5.create();
            var vue = this;
            hash.update(this.password);
            var usuario1 = this.usuario.trim().toLowerCase();
            axios.post(constantes["URI_USUARIO"] + "logearse", { "usuario": usuario1, "pwd": hash.hex() }).then(function(response) {
                if (response.data.length === 0) {
                    alertify.warning("Usuario o contraseña invalidos.")
                    return;
                }

                localStorage.setItem("es_logeado", "true");
                localStorage.setItem("usuario", JSON.stringify(response.data[0]));
                axios.get(constantes["URI_APP"] + "generate-token").then(function(mitoken) {
                    localStorage.setItem("token", JSON.stringify(mitoken.data));
                    vue.$router.push({ "name": "dashboard_dashboard" });
                });

                //alert(JSON.stringify(response));
            });
        }
    },
}
</script>