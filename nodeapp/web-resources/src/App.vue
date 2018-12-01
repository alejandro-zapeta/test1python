<template>
    <v-app>
        <v-navigation-drawer v-model="navigator" app>
            <v-toolbar flat>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            Sega
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list v-if="isLoggin() === true" dense class="pt-0">
                <v-list-tile :to="{'name': item.goto}" v-for="item in items" :key="item.title">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app>
            <v-toolbar-side-icon @click.stop="navigator = !navigator"></v-toolbar-side-icon>
            <v-toolbar-title v-if="isLoggin() === true" class="headline text-uppercase">
                <span>Cliente:</span>
                <span class="font-weight-light"> {{usuario.nombre_cliente}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="isLoggin() === false" flat :to="{'name': 'login_login'}">
                <span class="mr-2">Login</span>
            </v-btn>
            <v-btn v-if="isLoggin() === true" flat v-on:click="logout()">
                <span class="mr-2">Logout</span>
            </v-btn>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            "usuario": (JSON.parse(localStorage.getItem("usuario")) == null) ? {} : (JSON.parse(localStorage.getItem("usuario"))),
            "navigator": null,
            "items": [
                { title: 'Usuarios', goto: "usuarios_index", icon: 'question_answer' },
                { title: 'Dashboard', goto: "dashboard_dashboard", icon: 'question_answer' }
            ]
        }
 
    },
    methods: {
        "isLoggin": function() {
            return (localStorage.getItem("es_logeado") === "true") ? true : false;
        },
        "logout": function() {
            localStorage.setItem("es_logeado", "false");
            this.$router.push({ name: 'login_login' });
        }
    },
    beforeUpdate() {
        var a = this.$router.currentRoute;
        a = a.name;
        var esLogeado = this.isLoggin();
        if (esLogeado) {
            return;
        }

        if (a !== "login_login") {
            this.$router.push({ name: 'login_login' });
        }
    }
}
</script>