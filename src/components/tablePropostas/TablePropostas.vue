<template>
    <div>
        <vue-good-table
        :columns="colunas"
        :rows="linhasComp"
        :pagination-options="{
        enabled: true,
        perPage: 8,
        }">
        </vue-good-table>
    </div>
</template>

<style>

</style>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
import api from '../../config/api';

export default {
  name: 'TablePropostas',
  props: ['politico'],
  components: {
    VueGoodTable,
  },
  data() {
    return {
      colunas: [{
        label: 'Tipo',
        field: 'tipo',
      },
      {
        label: 'Descrição',
        field: 'desc',
      },
      {
        label: 'Situação',
        field: 'situacao',
      },
      {
        label: 'Data Apresentação',
        field: 'data',
        dateInputFormat: 'yyyy-mm-dd',
        dateOutputFormat: 'dd mm yy',
      },
      ],
      linhas: [],
      totalPages: 0,
      anos: [2019, 2020],
    };
  },
  async mounted() {
    await this.addPropostas(this.politico);
  },
  methods: {
    async addPropostas(politico) {
      try {
        let propostas = await this.getTodasPropostas(politico.id, politico.tipo);
        propostas = this.ordenarPropostas(propostas);
        this.inserirPropostasNaTabela(propostas);
      } catch (erro) {
        console.log(erro);
      }
    },
    async getTodasPropostas(id, tipo) {
      let propostas = [];
      const promises = this.anos.map(async (t) => api.get(`/propostas/${id}/${tipo}/todos?ano=${t}`));
      const arr = await Promise.all(promises);
      arr.forEach((t) => {
        propostas = [...propostas, ...t.data];
      });
      return propostas;
    },
    ordenarPropostas(propostas) {
      return propostas.sort((a, b) => (a.dataApresentacao < b.dataApresentacao ? 1 : -1));
    },
    inserirPropostasNaTabela(propostas) {
      propostas.forEach((t) => {
        const objLinha = {
          tipo: t.descricaoTipo,
          desc: t.descricao,
          situacao: t.situacao,
          data: t.dataApresentacao,
        };
        this.linhas.push(objLinha);
      });
    },
  },
  computed: {
    linhasComp() {
      return this.linhas;
    },
  },
};

</script>
