<template>
  <div id="chart">
    <apexChart
     type="bar"
     height="350"
     width="500"
     :options="chartOptions"
     :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import api from '../../config/api';

export default {
  name: 'GastosChart',
  data() {
    return {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chartOptions: {
        chart: {
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
          width: 4,
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
    };
  },
  components: {
    apexChart: VueApexCharts,
  },
  props: ['politico'],
  methods: {
    updateChart(responseGastos) {
      const novaColuna = [];
      for (let i = 1; i <= 12; i += 1) {
        const gastos = responseGastos.filter((valor) => valor.ano === this.ano && valor.mes === i);
        console.log(gastos);
        const soma = Object.values(gastos).reduce((prev, { valor }) => prev + valor, 0);
        novaColuna[i] = soma;
        this.apexChart.updateSeries([{ name: 'a', data: novaColuna }]);
      }
    },
  },
  async mounted() {
    try {
      const url = `/PoliticoItems/${this.politico}/gastos`;
      const responseGastos = await api.get(url);
      console.log(responseGastos.data);
      this.updateChart(responseGastos.data);
    } catch (erro) {
      console.log(erro);
    }
  },
};
</script>

<style>
</style>
