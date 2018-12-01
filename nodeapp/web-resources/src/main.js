import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueChartJs from 'vue-chartjs'

Vue.config.productionTip = false;

Vue.component('via-encabezado', { props: ['titulo', ], template: '<v-toolbar height="30" dark color="indigo"><v-spacer></v-spacer><v-toolbar-title class="align-end">{{titulo}}</v-toolbar-title><v-spacer></v-spacer></v-toolbar>' })
Vue.component('via-lbl-frm', {
    props: ['titulo', 'required', 'tamanio'],
    template: '<v-flex class="via-desc-form"><label>{{ titulo }}: <span class="red--text text--lighten-2" v-show="required && required === \'true\'">(*)</span></label></v-flex>'
});
Vue.filter('toCurrency', function(value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});
function arrayFromData(labels, array) {
    var resultado = [];
    for (var i = labels.length - 1; i >= 0; i--) {
        var Medida = labels[i];
        var total = 0;
        for (var i1 = array.length - 1; i1 >= 0; i1--) {
            if (array[i1]["unit"] === Medida) {
                total = array[i1]["rates"][0] + total;
            }
        }
        resultado.push(total);
    }

    return resultado;
}
Vue.component('line-chart', {
    props: ["midata", "mislabels"],
    extends: VueChartJs.Doughnut,
    methods: {
        "renderChartVue": function() {
            var lbls = this.mislabels;
            var miarreglo = arrayFromData(lbls, this.midata);
            this.renderChart({
                labels: lbls,

                datasets: [{
                    label: 'Data One',
                    backgroundColor: [
                        "#FF0000",
                        "#DB7093",
                        "#FF8C00",
                        "#F0E68C",
                        "#4B0082",
                        "#90EE90",
                        "#808000",
                        "#008080",
                        "#AFEEEE", "#4682B4", "#FFEBCD", "#708090",
                        "#FF6347", "#DA70D6", "#9370DB"
                    ],
                    data: miarreglo
                }]
            }, { responsive: true, maintainAspectRatio: false, legend: { "position": "bottom" } })
        }
    },
    mounted() {
        this.renderChartVue();
    },
    watch: {
        "midata": function() {
            //  this._chart.destroy();
            this.renderChartVue();
        }
    }
});


new Vue({
    router,
    render: function(h) { return h(App) }
}).$mount('#app');