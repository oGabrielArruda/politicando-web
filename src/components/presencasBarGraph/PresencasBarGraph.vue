<template>
    <apexChart type="bar" height="430" :options="chartOptions" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';

export default {
  name: 'PresencasBarGraph',
  props: ['politicos'],
  components: {
    apexChart: VueApexCharts,
  },
  data() {
    return {
      presencas: [],
      faltas: [],
      nomes: [],
      series: [{
        data: [44, 55, 41, 64, 22, 43, 21],
      }, {
        data: [53, 32, 33, 52, 13, 44, 32],
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 430,
          id: 'chartPresencasBar',
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff'],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        xaxis: {
          categories: [],
        },
      },
    };
  },
  mounted() {
    this.adicionarPoliticos(this.politicos);
    this.execChartUpdate();
  },
  watch: {
    politicos() {
      this.limparArrays();
      this.adicionarPoliticos(this.politicos);
      this.execChartUpdate();
    },
  },
  methods: {
    adicionarPoliticos(politicos) {
      politicos.forEach((t) => {
        this.addPolitico(t);
      });
    },
    addPolitico(politico) {
      this.nomes.push(politico.nome);
      this.presencas.push(politico.presencas);
      this.faltas.push(politico.faltas);
    },
    limparArrays() {
      this.nomes = [];
      this.faltas = [];
      this.presencas = [];
    },
    execChartUpdate() {
      console.log(this.presencas);
      console.log(this.faltas);
      console.log(this.nomes);
      ApexCharts.exec('chartPresencasBar', 'updateOptions', {
        series: [{
          name: 'Presenças',
          data: this.presencas,
        },
        {
          name: 'Faltas',
          data: this.faltas,
        }],
        labels: this.nomes,
      }, true);
    },
  },
};
</script>

<style>

</style>
