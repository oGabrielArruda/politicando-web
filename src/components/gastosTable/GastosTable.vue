<template>
  <div class="gastos-table">
    <select v-model="anoEscolhido">
      <option selected>Todos os anos</option>
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
    async addPolitico(politico) {
      const gastos = await api.get(`/PoliticoItems/${politico.id}/gastos`);
      const somatoria = this.getSomatoria(gastos.data);
      this.linhas.push({ nome: politico.nome, gastos: somatoria });
    },
    async addPoliticoPorAno(politico, ano) {
      const responseGastos = await api.get(
        `/PoliticoItems/${politico.id}/gastos`,
      );
      let gastos = responseGastos.data;

      const anoInt = parseInt(ano, 10);
      if (ano !== 'Todos os anos') {
        gastos = gastos.filter((t) => t.ano === anoInt);
      }
      const somatoria = this.getSomatoria(gastos);

      this.linhas.push({ nome: politico.nome, gastos: somatoria });
    },
    getSomatoria(gastos) {
      const somatoria = gastos.reduce((prev, { valor }) => prev + valor, 0);
      return somatoria;
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
    this.politicos.forEach(async (t) => {
      this.addPolitico(t);
    });
  },
  watch: {
    async politicos() {
      this.linhas = [];
      console.log(this.anoEscolhido);
      if (this.anoEscolhido === 0) {
        this.politicos.forEach(async (t) => {
          this.addPolitico(t);
        });
      } else {
        this.politicos.forEach(async (t) => {
          this.addPoliticoPorAno(t, this.anoEscolhido);
        });
      }
    },
    anoEscolhido() {
      this.linhas = [];
      this.politicos.forEach(async (t) => {
        this.addPoliticoPorAno(t, this.anoEscolhido);
      });
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
