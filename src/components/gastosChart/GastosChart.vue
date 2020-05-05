<template>
  <div id="chart">
    <select v-model="ano">
      <option :key="ano" v-for="ano in anos">{{ano}}</option>
    </select>
    <apexChart type="bar" height="350" width="800" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';
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
      gastosArr: [],
      idPoliticos: [],
      i: 0,
      qtdSelects: 1,
      lastSave: [],
    };
  },
  props: ['politico', 'inserirMais', 'politicos'],
  components: {
    apexChart: VueApexCharts,
  },
  methods: {
    async addPolitico(politico) {
      try {
        const responseGastos = await this.getGastosAPI(politico.id);
        this.updateChart(responseGastos, politico.nome, politico.id);
      } catch (erro) {
        console.log(erro);
      }
    },
    removePolitico(removed) {
      this.gastosArr = this.gastosArr.filter(
        (politico) => politico.name !== removed.nome,
      );
      this.idPoliticos = this.idPoliticos.filter((id) => id !== removed.id);
    },
    updateChart(responseGastos, nome, id) {
      const objGasto = this.getObjGastos(responseGastos, nome);
      this.gastosArr.push(objGasto);
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
    clone(arr) {
      return JSON.parse(JSON.stringify(arr));
    },
    acharRemovido(arrNovo, arrAntigo) {
      for (let i = 0; i < arrNovo.length; i += 1) {
        if (arrAntigo[i].id !== arrNovo[i].id) {
          return arrAntigo[i];
        }
      }
      return arrAntigo[arrAntigo.length - 1];
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
    gastosArrComp() {
      return this.gastosArr;
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
            this.gastosArr[i].name,
          );
          gastosArr.push(objGastos);
        }
        this.gastosArr = gastosArr;
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
        this.gastosArr[0] = objGasto;
        this.idPoliticos[0] = politico.id;
        ApexCharts.exec('chartGastos', 'updateSeries', this.gastosArr, true);
      } catch (erro) {
        console.log(erro);
      }
    },
    gastosArr: function a(gastosArr) {
      ApexCharts.exec('chartGastos', 'updateSeries', gastosArr, true);
    },
    politicos: function a(politicos) {
      // Primeira inserção
      if (this.lastSave.length === 0) {
        this.addPolitico(politicos[0]);
        this.lastSave = this.clone(politicos);
        return;
      }

      // Político Removido
      if (this.lastSave.length > politicos.length) {
        const removido = this.acharRemovido(politicos, this.lastSave);
        this.removePolitico(removido);
        this.lastSave = this.clone(politicos);
        return;
      }

      for (let i = 0; i < politicos.length; i += 1) {
        if (this.lastSave[i] === undefined) {
          this.addPolitico(politicos[i]);
        } else if (politicos[i].id !== this.lastSave[i].id) {
          this.addPolitico(politicos[i]);
          this.removePolitico(this.lastSave[i]);
        }
      }
      this.lastSave = this.clone(politicos);
    },
  },
};
</script>

<style>
</style>
