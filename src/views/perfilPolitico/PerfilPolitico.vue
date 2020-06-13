<template>
  <div class="container">
    <div class="header">
      <div class="foto-politico">
        <img :src="politicoSelected.foto" alt="" />
        <br />
        <button>Seguir</button>
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
          Cidade de Origem: <span> {{}} </span>
        </p>
      </div>
    </div>
    <div class="tabs">
      <div class="options">
        <h2 class="infos selected-color" @click="changeTab()">Informações Pessoais</h2>
        <h2 class="classificacao" @click="changeTab(1)">Classificação</h2>
        <h2 class="mandato" @click="changeTab(2)">Informações Mandato</h2>
      </div>
      <div class="selected"></div>
      <table-propostas :politico="politicoSelected" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TablePropostas from '../../components/tablePropostas/TablePropostas.vue';

export default {
  name: 'PerfilPolitico',
  components: {
    TablePropostas,
  },
  methods: {
    changeTab(tab) {
      switch (tab) {
        default:
          {
            const selected = document.querySelector('.infos');
            selected.classList.add('selected-color');
            this.removeColor(this.anterior);
            this.anterior = 1;
          }
          break;
        case 1:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.add('selected-color');
            this.removeColor(this.anterior);
            this.anterior = 2;
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.mandato');
            selected.classList.add('selected-color');
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
            selected.classList.remove('selected-color');
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.remove('selected-color');
          }
          break;

        case 3: {
          const selected = document.querySelector('.mandato');
          selected.classList.remove('selected-color');
        }
      }
    },
  },
  data() {
    return {
      anterior: 1,
    };
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'profile/politicoSelected',
    }),
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
