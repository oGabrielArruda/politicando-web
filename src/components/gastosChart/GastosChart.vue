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
     @onChange="addPolitico"
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
      i: 0,
    };
  },
  components: {
    apexChart: VueApexCharts,
    SelectPolitico,
  },
  methods: {
    async addPolitico(values) {
      try {
        if (values.value !== null) {
          const responseGastos = await this.getGastosAPI(values.value.id);
          this.updateChart(responseGastos, values.value.nome);
        } else {
          this.removePolitico(values.lastValue.nome);
        }
      } catch (erro) {
        console.log(erro);
      }
    },
    removePolitico(removedName) {
      console.log(this.politicos);
      this.politicos = this.politicos.filter((politico) => politico.name !== removedName);
    },
    updateChart(responseGastos, nome) {
      const objGasto = this.getObjGastos(responseGastos, nome);
      this.politicos.push(objGasto);
    },
    getObjGastos(responseGastos, nome) {
      const objGasto = { name: nome, data: [] };
      for (let i = 1; i <= 12; i += 1) {
        let ano = this.ano - 1;
        ano += 1; // não me pergunte pq tem que fazer isso, só arrumei o bug
        const gastos = responseGastos.filter((valor) => valor.ano === ano && valor.mes === i);
        const soma = Object.values(gastos).reduce((prev, { valor }) => prev + valor, 0);
        if (soma > 0) {
          const valor = soma + 33763;
          objGasto.data.push(valor.toFixed(2));
        } else if (this.dataDeHojeEhMaior(ano, i)) {
          objGasto.data.push((33763).toFixed(2));
        } else {
          objGasto.data.push(0);
        }
      }
      return objGasto;
    },
    async getGastosAPI(idPolitico) {
      console.log('Entrou no get gastos');
      const url = `/PoliticoItems/${idPolitico}/gastos`;
      const responseGastos = await api.get(url);
      return responseGastos.data;
    },
    dataDeHojeEhMaior(ano, mes) {
      const data = new Date();
      const anoAtual = data.getFullYear();
      if (anoAtual > ano) { return true; }
      const mesAtual = data.getMonth();
      if (mesAtual > mes) { return true; }
      return false;
    },
  },
  async mounted() {
    try {
      const responseGastos = await
      this.getGastosAPI(this.politicoCarrossel.id);
      this.updateChart(responseGastos, this.politicoCarrossel.nome);
    } catch (erro) {
      console.log(erro);
    }
  },
  computed: {
    politicoCarrossel() { return this.$store.state.politicoCarrossel; },
  },
  watch: {
    ano: async function a() {
      try {
        const responseGastos = await this.getGastosAPI(this.politicoCarrossel.id);
        const objGastos = this.getObjGastos(responseGastos, this.politicoCarrossel.nome);
        ApexCharts.exec('chartGastos', 'updateSeries', [
          objGastos,
        ], true);
      } catch (erro) {
        console.log(erro);
      }
    },
    politicoCarrossel: async function a(politico) {
      if (this.i === 0) { this.i += 1; return; }
      try {
        const responseGastos = await this.getGastosAPI(politico.id);
        const objGasto = this.getObjGastos(responseGastos, politico.nome);
        this.politicos[0] = objGasto;
        console.log(this.politicos[0]);
        ApexCharts.exec('chartGastos', 'updateSeries', this.politicos, true);
      } catch (erro) {
        console.log(erro);
      }
    },
    politicos: function a(politicos) {
      ApexCharts.exec('chartGastos', 'updateSeries', politicos, true);
    },
  },
};
</script>

<style>
</style>
