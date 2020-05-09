<template>
  <div class="gastos-table">
    <select v-model="anoEscolhido">
      <option selected value=0>Todos os anos</option>
      <option :key="ano" v-for="ano in anos">{{ ano }}</option>
    </select>
    <VueGoodTable
      :columns="colunas"
      :rows="linhasComp"
      :sort-options="{ enabled: true, initialSortBy: { field: 'gastos', type: 'desc'} }"
    />
  </div>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import api from '../../config/api';

export default {
  name: 'GastosTable',
  props: ['politicos'],
  data() {
    return {
      colunas: [
        {
          label: 'Nome',
          field: 'nome',
        },
        {
          label: 'Gastos',
          field: 'gastos',
          type: 'number',
          formatFn: this.formatFn,
        },
      ],
      linhas: [],
      anos: [2019, 2020],
      anoEscolhido: 0,
    };
  },
  methods: {
    async addPoliticos(politicosArr) {
      politicosArr.forEach(async (t) => {
        const responseGastos = await api.get(`/PoliticoItems/${t.id}/gastos`);
        const gastosFiltrados = this.filtrarPorAno(responseGastos.data, this.anoEscolhido);
        const somatoria = this.getSomatoria(gastosFiltrados);
        this.adicionarLinhaNaTabela(t.nome, somatoria);
      });
    },
    filtrarPorAno(gastos, ano) {
      const anoInt = parseInt(ano, 10);
      if (anoInt === 0) { return gastos; }
      const gastosFiltrados = gastos.filter((t) => t.ano === anoInt);
      return gastosFiltrados;
    },
    getSomatoria(gastos) {
      const somatoria = gastos.reduce((prev, { valor }) => prev + valor, 0);
      return somatoria;
    },
    adicionarLinhaNaTabela(nome, gastos) {
      this.linhas.push({ nome, gastos });
    },
    formatFn(value) {
      const valInt = parseInt(value, 10);
      const valorParaExibir = valInt.toFixed(2).split('.');
      valorParaExibir[0] = `R$ ${valorParaExibir[0]
        .split(/(?=(?:...)*$)/)
        .join('.')}`;
      return `${valorParaExibir.join(',')}`;
    },
  },
  async mounted() {
    this.addPoliticos(this.politicos);
  },
  watch: {
    async politicos(politicosArr) {
      this.linhas = [];
      this.addPoliticos(politicosArr);
    },
    anoEscolhido() {
      this.linhas = [];
      this.addPoliticos(this.politicos);
    },
  },
  computed: {
    linhasComp() {
      return this.linhas;
    },
  },
  components: {
    VueGoodTable,
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
