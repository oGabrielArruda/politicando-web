<template>
  <div class="container">
    <div class="header">
      <div class="foto-politico">
        <img :src="politicoSelected.foto" alt="" />
        <br />
        <button v-if="politicoSelected.seguindo" class="following" @click="unfollow()">
          Seguindo
        </button>
        <button v-else @click="follow()">
          Seguir
        </button>
      </div>
      <div class="info-politico">
        <p>
          Nome eleitoral: <span>{{ politicoSelected.nome }}</span>
        </p>
        <p>
          Partido: <span> {{ politicoSelected.partido }} </span>
        </p>
        <p>
          Estado de Origem: <span> {{ politicoSelected.estado }} </span>
        </p>
        <p>
          Numero de Processos: <span> {{ politicoSelected.processos }} </span>
        </p>
        <p>
          Cidade de Origem: <span> {{ politico.municipioNasc }} </span>
        </p>
      </div>
    </div>
    <div class="tabs">
      <div class="options">
        <div>
          <p class="infos selected-color" @click="changeTab()">Propostas</p>
          <div id="1" class="selected"></div>
        </div>
        <div>
           <p class="classificacao" @click="changeTab(1)">Classificação</p>
           <div id="2"></div>
        </div>
       <div>
         <p class="mandato" @click="changeTab(2)">Estatísticas</p>
         <div id="3"></div>
       </div>

      </div>

      <div class="tab-contents">
        <table-propostas :politico="politicoSelected" id="propostas"/>
        <Table :size="8" :showBorder="false" class="out" id="table"/>
        <GastosChart :politico="getObj" :politicos="politicosComp" id="graphs" class="out"/>
      </div>


    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TablePropostas from '../../components/tablePropostas/TablePropostas.vue';
import Table from '../../components/table/Table.vue';
import api from '../../config/api';
import GastosChart from '../../components/gastosChart/GastosChart.vue';

export default {
  name: 'PerfilPolitico',
  components: {
    TablePropostas,
    Table,
    GastosChart,
  },
  methods: {
    changeTab(tab) {
      switch (tab) {
        default:
          {
            const selected = document.querySelector('.infos');
            const div = document.getElementById('1');
            const props = document.getElementById('propostas');
            selected.classList.add('selected-color');
            props.classList.remove('out');
            div.classList.add('selected');
            this.removeColor(this.anterior);
            this.anterior = 1;
          }
          break;
        case 1:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.add('selected-color');
            const div = document.getElementById('2');
            const table = document.getElementById('table');
            table.classList.remove('out');
            div.classList.add('selected');
            this.removeColor(this.anterior);
            this.anterior = 2;
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.mandato');
            selected.classList.add('selected-color');
            const div = document.getElementById('3');
            const graphs = document.getElementById('graphs');
            div.classList.add('selected');
            graphs.classList.remove('out');
            this.removeColor(this.anterior);
            this.anterior = 3;
          }
          break;
      }
    },
    removeColor(tab) {
      switch (tab) {
        default:
          break;
        case 1:
          {
            const selected = document.querySelector('.infos');
            const div = document.getElementById('1');
            const propostas = document.getElementById('propostas');
            propostas.classList.add('out');
            selected.classList.remove('selected-color');
            div.classList.remove('selected');
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.remove('selected-color');
            const table = document.getElementById('table');
            table.classList.add('out');
            const div = document.getElementById('2');
            div.classList.remove('selected');
          }
          break;

        case 3: {
          const selected = document.querySelector('.mandato');
          selected.classList.remove('selected-color');
          const graphs = document.getElementById('graphs');
          graphs.classList.add('out');
          const div = document.getElementById('3');
          div.classList.remove('selected');
        }
      }
    },
    async follow() {
      try {
        await api.post('/Users/follow', {
          idUser: this.user.id,
          idPolitico: this.politicoSelected.id,
        });
        this.politicoSelected.seguindo = true;
        this.$toast.success(`Você seguiu ${this.politicoSelected.nome}`);
      } catch (err) {
        console.log(err);
      }
    },
    async unfollow() {
      try {
        await api.post('/Users/unfollow', {
          idUser: this.user.id,
          idPolitico: this.politicoSelected.id,
        });
        this.politicoSelected.seguindo = false;
        this.$toast.success(`Você deixou de seguir ${this.politicoSelected.nome}`);
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      const dadosPolitico = await api.get(`/PoliticoItems/${this.politicoSelected.id}/detalhes`);
      this.politico = dadosPolitico.data;
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      anterior: 1,
      divAnterior: 1,
      politico: 1,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      politicoSelected: 'profile/politicoSelected',
      politicosSelects: 'carousel/politicosSelects',
    }),
    getObj() {
      return this.politicoSelected;
    },
    politicosComp() {
      return this.politicosSelects;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
