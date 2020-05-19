<template>
    <div>
      <half-circle-spinner
      class="orbit"
      v-show="loading"
      :size="height/2"
      :color="'#5de63e'"
      />
      <h1> Total de propostas: </h1>
      <h2> {{ totalDePropostas }} </h2>
      <apexChart type="pie" width="800" :height="hComp" :options="chartOptions" :series="series" />
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import { HalfCircleSpinner } from 'epic-spinners';
// import ApexCharts from 'apexcharts';
import api from '../../config/api';

export default {
  name: 'PropostasPieChart',
  data() {
    return {
      loading: false,
      height: 300,
      totalDePropostas: 0,
      tipos: [],
      total: [],
      series: [],
      chartOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#db943d', '#494569',
          '#ad6363', '#63ad67', '#63ad9f'],
        chart: {
          width: 800,
          height: 300,
          type: 'pie',
          id: 'chartPropostas',
        },
        labels: [],
        legend: {
          show: true,
          offsetX: 50,
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              show: false,
            },
          },
        }],
      },
    };
  },
  components: {
    apexChart: VueApexCharts,
    HalfCircleSpinner,
  },
  props: ['politico', 'ano', 'subGraph'],
  async mounted() {
    try {
      const { id } = this.politico;
      const { tipo } = this.politico;
      await this.updateChart(id, tipo);
      this.fixStyle();
    } catch (erro) {
      console.log(`Erro mounted propostas pie chart ${erro}`);
    }
  },
  methods: {
    async updateChart(id, tipo) {
      this.loading = true;
      const response = await this.fetchPropostasDivididas(id, tipo, this.ano);
      this.changeTotalPropostas(response);
      this.pushToMainArray(response);
      this.loading = false;
    },
    async fetchPropostasDivididas(id, tipo, ano) {
      let url = `/Propostas/${id}/${tipo}/divididos`;
      if (ano && ano !== 0) { url += `?ano=${ano}`; }
      const response = await api.get(url);
      return response.data.propostasDivididas;
    },
    changeTotalPropostas(propostasObj) {
      const total = propostasObj.reduce((prev, { count }) => prev + count, 0);
      this.totalDePropostas = total;
    },
    pushToMainArray(propostasObj) {
      propostasObj.forEach((t) => {
        const nome = this.getNome(t.name);
        this.chartOptions.labels.push(nome);
        this.series.push(t.count);
      });
    },
    getNome(nome) {
      let nomeLower = nome.toLowerCase();
      nomeLower = nomeLower.replace('da comissão de', 'sobre');
      return nomeLower.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    },
    limparSeries() {
      while (this.chartOptions.labels.length) {
        this.series.pop();
        this.chartOptions.labels.pop();
      }
    },
    fixStyle() {
      if (this.subGraph) {
        this.height = 230;
      }
    },
  },
  watch: {
    async politico(p) {
      this.limparSeries();
      await this.updateChart(p.id, p.tipo, this.ano);
    },
    async ano(ano) {
      this.limparSeries();
      await this.updateChart(this.politico.id, this.politico.tipo, ano);
    },
  },
  computed: {
    hComp() {
      return this.height;
    },
  },
};
</script>

<style>
  .orbit {
    margin-top: 5%;
    margin-left: 35%;
    opacity: 75%;
  }
</style>
