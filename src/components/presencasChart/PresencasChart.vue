<template>
    <div>
        <apexChart type="radialBar"
        width="800"
        height="550"
        :options="chartOptions"
        :series="series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';

export default {
  name: 'PresencasChart',
  props: ['politicos'],
  components: {
    apexChart: VueApexCharts,
  },
  data() {
    return {
      presencas: [],
      nomes: [],
      series: [],
      chartOptions: {
        chart: {
          height: 390,
          type: 'radialBar',
          id: 'chartPresencas',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
              },
            },
          },
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#db943d', '#494569',
          '#ad6363', '#63ad67', '#63ad9f'],
        labels: [],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 120,
          offsetY: 25,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0,
          },
          formatter(seriesName, opts) {
            return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}%`;
          },
          itemMargin: {
            vertical: 3,
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        }],
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
      this.presencas.push(this.calcularPorcentagem(politico));
      this.nomes.push(politico.nome);
    },
    calcularPorcentagem(politico) {
      const { presencas } = politico;
      const totalEventos = politico.presencas + politico.faltas;
      const porc = Math.round((presencas / totalEventos) * 100);
      return porc;
    },
    limparArrays() {
      this.presencas = [];
      this.nomes = [];
    },
    execChartUpdate() {
      ApexCharts.exec('chartPresencas', 'updateOptions', {
        series: this.presencas,
        labels: this.nomes,
      }, true);
    },
  },
};
</script>

<style>

</style>
