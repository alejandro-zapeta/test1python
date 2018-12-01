<template>
    <v-container class="via-container" fluid>
        <div>
            <v-toolbar height="30" dark color="indigo">
                <v-spacer></v-spacer>
                <v-toolbar-title class="align-end">Usuarios</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card>
                <v-layout>
                    <v-text-field v-model="search" style="height: 34px;" solo flat prepend-icon="search" label="Búsqueda usuarios" single-line hide-details></v-text-field>
                    <v-btn :to="{name: 'usuarios_gestionar'}" color="success" dark>
                        <img src="static/icons/addrow-2.png"  height="25" >
                        Nuevo usuario
                    </v-btn>
                </v-layout>
            </v-card>
            <v-data-table :headers="headers" :search="search" :items="usuarios" :rows-per-page-items="[10,25,50,{text:'All', 'value': -1}]" class="elevation-1 via-tabla">
                <template slot="items" slot-scope="item">
                    <td align-center style="width: 60px;">{{item.item.usuario}}</td>
                    <td align-center>{{item.item.descripcion}}</td>
                    <td align-center style="width: 30px;">{{item.item.margen}}</td>
                    <td align-center style="width: 50px;">{{item.item.tiempo_suscripcion}}</td>
                    <td align-center>{{item.item.descripcion}}</td>
                    <td align-center style="width: 90px;">{{item.item.correo}}</td>
                    <td style="width: 90px;text-align: right;">{{item.item.telefono}}</td>
                    <td style="width: 90px;text-align: right;">{{item.item.tiempo_vigencia_margen}}</td>
                    <td style="width: 90px;text-align: right;">{{item.item.alerta_consumo}}</td>
                    <td style="width: 110px;">
                        <center>
                            <img style="cursor:pointer" src="static/icons/edit-3.png"  height="25"  @click="editItem(item.item)" />
                            <img  style="cursor:pointer" src="static/image/delete.png"  height="25"  @click="eliminar(item.item.id_pais)" />
                        </center>
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
var constantes = require("../../constantes.js");
var axios = require("axios");
export default {
    data() {
        return {
            "usuarios": [],
            "headers": [
                { "text": "Usuario" },
                { "text": "Nombre cliente" },
                { "text": "Margen" },
                { "text": "Tiempo suscripción" },
                { "text": "Descripción" },
                { "text": "Correo" },
                { "text": "Teléfono" },
                { "text": "Vig. Margen" },
                { "text": "Alerta consumo" },
                {"text": ""}
            ]
        }
    },
    created() {
        var vue = this;
        axios.get(constantes["URI_USUARIO"]).then(function(response) {
            vue.usuarios = response.data;
        });
    }
}
</script>