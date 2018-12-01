<template>
    <div>

        <v-layout row wrap>
            <v-flex xs12 md6><h2>CONSUMO EN AZURE</h2></v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md2>
                <v-menu :dark="false" :close-on-content-click="false" v-model="menu2" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" :value="dateFormated1" label="Fecha inicial" prepend-icon="event" clearable>
                    </v-text-field>
                    <v-date-picker @change="llenarInformacion" :reactive="true" v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 md2>
                <v-menu :dark="false"  :close-on-content-click="false" v-model="menu1" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                    <v-text-field slot="activator" :value="dateFormated2" label="Fecha final" prepend-icon="event" clearable></v-text-field>
                    <v-date-picker @change="llenarInformacion" :reactive="true" v-model="date1" @input="menu1 = false"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 md2>
                <v-select v-model="medidasSeleccionadas" @change="filtrarData" :items="medidas" label="Medida" multiple>
                    <template slot="selection" slot-scope="{ item, index }">
                        <v-chip v-if="index === 0">
                            <span>{{ item }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="grey--text caption">(+{{ medidasSeleccionadas.length - 1 }} others)</span>
                    </template>
                </v-select>
            </v-flex>
            <v-flex xs12 md2>
                <v-select v-model="tagsSeleccionadas" @change="filtrarData" :items="tags" label="Tag" multiple>
                    <template slot="selection" slot-scope="{ item, index }">
                        <v-chip v-if="index === 0">
                            <span>{{ item }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="grey--text caption">(+{{ tagsSeleccionadas.length - 1 }} others)</span>
                    </template>
                </v-select>
            </v-flex>
            <v-flex class="text-xs-right" xs12 md4>
                <h3>{{mitotal | toCurrency}}</h3> <br>
                <label style="color:red">Consumo estimado*</label>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-data-table :headers="headers" :rows-per-page-items="[60, 200, 500, 
                {'text': 'Todos', 'value': -1}]" :items="desserts" class="elevation-1 via-tabla">
                    <template slot="items" slot-scope="props">
                        <td>{{ (props.item.instanceData) ? props.item.instanceData.tags  : "" }}</td>
                        <td class="text-xs-right">{{ fechaFormateada(props.item.usageStartTime) }}</td>
                        <td class="text-xs-right">{{ props.item.resource.name }}</td>
                        <td class="text-xs-right">{{ props.item.unit }}</td>
                        <td class="text-xs-right">{{ props.item.quantity }}</td>
                        <td class="text-xs-right">{{ props.item.Costo }}</td>
                    </template>
                </v-data-table>
            </v-flex>
            <v-flex xs12 md4>
                <line-chart v-bind:mislabels="lblMedidas" v-bind:midata="desserts"></line-chart>
            </v-flex>
        </v-layout>
    </div>
</template>
<script src="./dashboard.js"></script>