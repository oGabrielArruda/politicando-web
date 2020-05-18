<template>
    <div>
      <h1> Total de propostas: </h1>
      <h2> {{ totalDePropostas }} </h2>
      <apexChart type="pie" width="800" height="300" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
// import ApexCharts from 'apexcharts';
import api from '../../config/api';


export default {
  name: 'PropostasPieChart',
  data() {
    return {
      totalDePropostas: 0,
      tipos: [],
      total: [],
      series: [],
      chartOptions: {
        chart: {
          width: 800,
          height: 300,
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
      this.changeTotalPropostas(response);
      this.pushToMainArray(response);
    },
    async fetchGastosDivididos(id, tipo) {
      const response = await api.get(`/Propostas/${id}/${tipo}/divididos`);
      return response.data.propostasDivididas;
    },
    changeTotalPropostas(propostasObj) {
      const total = propostasObj.reduce((prev, { count }) => prev + count, 0);
      this.totalDePropostas = total;
    },
    pushToMainArray(propostasObj) {
      propostasObj.forEach((t) => {
        const nome = this.getNome(t.name);
        console.log(nome);
        this.chartOptions.labels.push(nome);
        this.series.push(t.count);
      });
    },
    getNome(nome) {
      const nomeLower = nome.toLowerCase();
      nomeLower.replace('da comissão', '');
      return nomeLower.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    },
  },
  watch: {
    async politico(p) {
      this.series = [];
      this.chartOptions.labels = [];
      await this.updateChart(p.id, p.tipo);
    },
  },
};
</script>

<style>

</style>
