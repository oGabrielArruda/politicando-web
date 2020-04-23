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
      ano: 2020,
      anos: [2019, 2020],
      politicos: [],
    };
  },
  components: {
    apexChart: VueApexCharts,
    SelectPolitico,
  },
  props: ['politico'],
  methods: {
    updateChart(responseGastos) {
      const objGasto = { name: 'Politico', data: [] };

      for (let i = 1; i <= 12; i += 1) {
        const gastos = responseGastos.filter((valor) => valor.ano === this.ano && valor.mes === i);
        console.log(gastos);
        const soma = Object.values(gastos).reduce((prev, { valor }) => prev + valor, 0);
        objGasto.data.push(soma + 33763);
      }
      ApexCharts.exec('chartGastos', 'appendSeries', objGasto);
    },
    async getGastos(idPolitico) {
      const url = `/PoliticoItems/${idPolitico}/gastos`;
      const responseGastos = await api.get(url);
      return responseGastos;
    },
  },
  async mounted() {
    try {
      const responseGastos = await this.getGastos(this.politico);
      console.log(responseGastos.data);
      this.updateChart(responseGastos.data);
    } catch (erro) {
      console.log(erro);
    }
  },
  watch: {
    ano: () => {
      ApexCharts.exec('chartGastos', 'resetSeries');
    },
  },
};
</script>

<style>
</style>
