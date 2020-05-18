<template>
    <apexChart type="pie" width="800" height="800" :options="chartOptions" :series="series" />
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';
import api from '../../config/api';


export default {
  name: 'PropostasPieChart',
  data() {
    return {
      arrPropostas: [],
      tipos: [],
      total: [],
      series: [],
      chartOptions: {
        chart: {
          width: 800,
          height: 800,
          type: 'pie',
          id: 'chartPropostas',
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
    };
  },
  components: {
    apexChart: VueApexCharts,
  },
  props: ['politico'],
  async mounted() {
    try {
      const { id } = this.politico;
      const { tipo } = this.politico;
      await this.updateChart(id, tipo);
    } catch (erro) {
      console.log(`Erro mounted propostas pie chart ${erro}`);
    }
  },
  methods: {
    async updateChart(id, tipo) {
      const response = await this.fetchGastosDivididos(id, tipo);
      this.pushToMainArray(response);
      this.execChartUpdate();
    },
    async fetchGastosDivididos(id, tipo) {
      const response = await api.get(`/Propostas/${id}/${tipo}/divididos`);
      return response.data.propostasDivididas;
    },
    pushToMainArray(propostasObj) {
      propostasObj.forEach((t) => {
        this.tipos.push(t.name);
        this.total.push(t.count);
      });
    },
    execChartUpdate() {
      ApexCharts.exec('chartPropostas', 'updateOptions', {
        series: this.total,
        labels: this.tipos,
      }, true);
    },
  },
  watch: {
    async politico(p) {
      this.tipos = [];
      this.total = [];
      await this.updateChart(p.id, p.tipo);
    },
  },
};
</script>

<style>

</style>
