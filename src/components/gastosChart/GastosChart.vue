<template>
  <div id="chart">
    <select v-model="ano">
      <option :key="ano" v-for="ano in anos">{{ano}}</option>
    </select>
    <apexChart type="bar" height="350" width="800" :options="chartOptions" :series="series" />
    <div id="select" :key="i" v-for="i in qtdSelects" v-show="inserirMais">
      <SelectPolitico
        @onChange="addPolitico"
        @onDelete="removePolitico"
        :url="'/PoliticoItems/filtrado?size=5&page=1'"
        :text="'Selecione o político para comparar os gastos'"
      />
    </div>
    <button @click="increaseQtdSelects(1)" v-show="inserirMais">Adicionar</button>
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
          categories: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
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
            formatter: (val) => {
              const valInt = parseInt(val, 10);
              const valor = valInt.toFixed(2).split('.');
              valor[0] = `R$ ${valor[0].split(/(?=(?:...)*$)/).join('.')}`;
              return `R$ ${valor.join(',')}`;
            },
          },
        },
      },
      ano: 2019,
      anos: [2019, 2020],
      politicos: [],
      idPoliticos: [],
      i: 0,
      qtdSelects: 1,
    };
  },
  props: ['politico', 'inserirMais'],
  components: {
    apexChart: VueApexCharts,
    SelectPolitico,
  },
  methods: {
    async addPolitico(values) {
      try {
        const responseGastos = await this.getGastosAPI(values.value.id);
        this.updateChart(responseGastos, values.value.nome, values.value.id);
        if (values.lastValue !== null) {
          // se o usuário sobrepos o select
          this.removePolitico(values.lastValue);
        }
      } catch (erro) {
        console.log(erro);
      }
    },
    removePolitico(removed) {
      this.politicos = this.politicos.filter(
        (politico) => politico.name !== removed.nome,
      );
      this.idPoliticos = this.idPoliticos.filter((id) => id !== removed.id);
    },
    updateChart(responseGastos, nome, id) {
      const objGasto = this.getObjGastos(responseGastos, nome);
      this.politicos.push(objGasto);
      this.idPoliticos.push(id);
    },
    getObjGastos(responseGastos, nome) {
      const objGasto = { name: nome, data: [] };
      for (let i = 1; i <= 12; i += 1) {
        let ano = this.ano - 1;
        ano += 1; // não me pergunte pq tem que fazer isso, só arrumei o bug
        const gastos = responseGastos.filter(
          (valor) => valor.ano === ano && valor.mes === i,
        );
        const soma = Object.values(gastos).reduce(
          (prev, { valor }) => prev + valor,
          0,
        );
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
      // console.log('Entrou no get gastos');
      const url = `/PoliticoItems/${idPolitico}/gastos`;
      const responseGastos = await api.get(url);
      return responseGastos.data;
    },
    dataDeHojeEhMaior(ano, mes) {
      const data = new Date();
      const anoAtual = data.getFullYear();
      if (anoAtual > ano) {
        return true;
      }
      const mesAtual = data.getMonth() + 1;
      if (mesAtual >= mes) {
        return true;
      }
      return false;
    },
    increaseQtdSelects(val) {
      if (this.qtdSelects < 5 && this.qtdSelects > 0) {
        this.qtdSelects += val;
      }
    },
  },
  async mounted() {
    try {
      const responseGastos = await this.getGastosAPI(this.politicoPrincipal.id);
      this.updateChart(
        responseGastos,
        this.politicoPrincipal.nome,
        this.politicoPrincipal.id,
      );
    } catch (erro) {
      console.log(erro);
    }
  },
  computed: {
    politicoPrincipal() {
      return this.politico;
    },
  },
  watch: {
    ano: async function a() {
      try {
        const gastosPromisses = [];
        this.idPoliticos.forEach((id) => {
          gastosPromisses.push(this.getGastosAPI(id));
        });
        const gastosResponses = await Promise.all(gastosPromisses);
        const gastosArr = [];
        for (let i = 0; i < this.idPoliticos.length; i += 1) {
          const objGastos = this.getObjGastos(
            gastosResponses[i],
            this.politicos[i].name,
          );
          gastosArr.push(objGastos);
        }
        this.politicos = gastosArr;
      } catch (erro) {
        console.log(erro);
      }
    },
    politicoPrincipal: async function a(politico) {
      if (this.i === 0) {
        this.i += 1;
        return;
      } // se for a primeira vez carregando o componente
      try {
        const responseGastos = await this.getGastosAPI(politico.id);
        const objGasto = this.getObjGastos(responseGastos, politico.nome);
        this.politicos[0] = objGasto;
        this.idPoliticos[0] = politico.id;
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
