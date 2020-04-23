<template>
  <div id="chart">
    <select v-model="ano">
      <option :key="ano" v-for="ano in anos"> {{ano}} </option>
    </select>
    <apexChart
     type="bar"
     height="350"
     width="800"
     :options="chartOptions"
     :series="series" />
     <SelectPolitico
     :url="'/PoliticoItems/filtrado?size=5&page=1'"
     :text="'Selecione o político para comparar os gastos'" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';
import SelectPolitico from '../selectpolitico/SelectPolitico.vue';
import api from '../../config/api';

export default {
  name: 'GastosChart',
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: 'chartGastos',
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['transparent'],
        },
        xaxis: {
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        },
        yaxis: {
          title: {
            text: 'Gastos (R$)',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `R$ ${val}`,
          },
        },
      },
      ano: 2019,
      anos: [2019, 2020],
      politicos: [],
    };
  },
  components: {
    apexChart: VueApexCharts,
    SelectPolitico,
  },
  methods: {
    updateChart(responseGastos) {
      const objGasto = this.getObjGastos(responseGastos);
      ApexCharts.exec('chartGastos', 'appendSeries', objGasto);
    },
    getObjGastos(responseGastos) {
      const objGasto = { name: 'Politico', data: [] };
      for (let i = 1; i <= 12; i += 1) {
        let ano = this.ano - 1;
        ano += 1; // não me pergunte pq tem que fazer isso, só arrumei o bug
        const gastos = responseGastos.filter((valor) => valor.ano === ano && valor.mes === i);
        console.log(gastos);
        const soma = Object.values(gastos).reduce((prev, { valor }) => prev + valor, 0);
        if (soma > 0) {
          const valor = soma + 33763;
          objGasto.data.push(valor.toFixed(2));
        } else { objGasto.data.push(0); }
      }
      return objGasto;
    },
    async getGastosAPI(idPolitico) {
      console.log('Entrou no get gastos');
      const url = `/PoliticoItems/${idPolitico}/gastos`;
      const responseGastos = await api.get(url);
      return responseGastos.data;
    },
  },
  async mounted() {
    try {
      const responseGastos = await this.getGastosAPI(this.$store.state.politicoId);
      console.log(responseGastos);
      this.updateChart(responseGastos);
    } catch (erro) {
      console.log(erro);
    }
  },
  computed: {
    idPolitico() { return this.$store.state.politicoId; },
  },
  watch: {
    ano: async function a() {
      try {
        const responseGastos = await this.getGastosAPI(this.idPolitico);
        const objGastos = this.getObjGastos(responseGastos);
        ApexCharts.exec('chartGastos', 'updateSeries', [
          objGastos,
        ], true);
      } catch (erro) {
        console.log(erro);
      }
    },
    idPolitico: async function a(val) {
      try {
        const responseGastos = await this.getGastosAPI(val);
        const objGastos = this.getObjGastos(responseGastos);
        ApexCharts.exec('chartGastos', 'updateSeries', [
          objGastos,
        ], true);
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>

<style>
</style>
