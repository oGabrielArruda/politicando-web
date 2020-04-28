<template>
  <div>
    <apexChart type="donut" width="800" :options="chartOptions" :series="series"/>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts';
// import ApexCharts from 'apexcharts';
import api from '../../config/api';

export default {
  name: 'GastosDivididos',
  data() {
    return {
      series: [],
      chartOptions: {
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#db943d', '#494569',
          '#ad6363', '#63ad67', '#63ad9f'],
        chart: {
          width: 500,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            customScale: 1,
            donut: {
              labels: {
                show: true,
                value: {
                  show: true,
                  formatter: (val) => {
                    let valor = val + 1;
                    valor -= 1;
                    return `R$ ${valor.toLocaleString('pt-BR')}`;
                  },
                },
                total: {
                  show: true,
                  formatter: (val) => {
                    const valor = val.globals.seriesTotals.reduce((a, b) => a + b, 0);
                    return `R$ ${valor.toLocaleString('pt-BR')}`;
                  },
                },
              },
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230,
        },
      },
    };
  },
  props: ['politico'],
  components: {
    apexChart: VueApexCharts,
  },
  methods: {
    addData(data) {
      this.series.push(Math.round(data.valorTotal));
      this.chartOptions.labels.push(data.tipoDespesa);
    },
    limparSeries() {
      while (this.series.length) {
        this.series.pop();
        this.chartOptions.labels.pop();
      }
    },
    tipoDespesa(despesa) {
      const despesaL = despesa.toLowerCase();
      if (despesaL.indexOf('aquisição de material') !== -1) { return 'Material de consumo'; }
      if (despesaL.indexOf('aluguel de imóveis') !== -1) { return 'Aluguel e manutenção de escritórios'; }
      if (despesaL.indexOf('contratação de consultorias') !== -1) { return 'Contratação de serviços e acessoria'; }
      if (despesaL.indexOf('locomoção, hospedagem') !== -1) { return 'Combustíveis e Hospedagem'; }
      if (despesaL.indexOf('passagens') !== -1) { return 'Passagens de viagens'; }
      if (despesaL.indexOf('combustíveis e lubrificantes') !== -1) { return 'Combustíveis'; }
      if (despesaL.indexOf('consultoria') !== -1) { return 'Consultoria e trabalhos'; }
      if (despesaL.indexOf('hospedagem') !== -1) { return 'Hospedagem'; }
      if (despesaL.indexOf('emissão bilhete') !== -1) { return 'Passagens aéreas'; }
      if (despesaL.indexOf('divulgação da ati') !== -1) { return 'Divulgação da atividade parlamentar'; }
      if (despesaL.indexOf('fornecimento de alime') !== -1) { return 'Alimentação'; }
      if (despesaL.indexOf('manutenção de escritório') !== -1) { return 'Manutenção de escritório'; }
      if (despesaL.indexOf('serviço de táxi') !== -1) { return 'Taxi, pedágio, estacionamento'; }
      if (despesaL.indexOf('serviços postais') !== -1) { return 'Serviços postais'; }
      if (despesaL.indexOf('fretamento de aeronaves') !== -1) { return 'Locação de aeronaves'; }
      if (despesaL.indexOf('fretamento de veículos') !== -1) { return 'Locação de veículos'; }
      if (despesaL.indexOf('telefonia') !== -1) { return 'Telefonia'; }
      if (despesaL.indexOf('Assinatura de publi') !== -1) { return 'Assinatura de publicações'; }
      return despesa;
    },
  },
  watch: {
    politico: async function a() {
      try {
        this.limparSeries();
        const url = `/PoliticoItems/${this.politico.id}/gastos/divididos`;
        const response = await api.get(url);
        console.log(response.data);
        for (let i = 0; i < response.data.length; i += 1) {
          const data = response.data[i];
          data.tipoDespesa = this.tipoDespesa(data.tipoDespesa);
          this.addData(data);
        }
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>
<style>
</style>
