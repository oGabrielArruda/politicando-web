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
          Estado: <span> {{ politicoSelected.estado }} </span>
        </p>
        <p>
          Numero de Processos: <span> {{ politicoSelected.processos }} </span>
        </p>
      </div>
    </div>
    <div class="tabs">
      <div class="options">
        <div>
          <p class="infos selected-color" @click="changeTab()">Informações</p>
          <div id="1" class="selected"></div>
        </div>
        <div>
          <p class="classificacao" @click="changeTab(1)">Propostas</p>
          <div id="2"></div>
        </div>
        <div>
          <p class="mandato" @click="changeTab(2)">Estatísticas</p>
          <div id="3"></div>
        </div>
      </div>

      <div class="tab-contents">
        <!-- ABA 1 -->
        <div class="infoPolitico" v-if="anterior === 1">
          <p>
            Nome completo: <span> {{ politico.nomeCompleto }} </span>
          </p>
          <p>
            Telefone: <span> {{ politico.telefone }} </span>
          </p>
          <p>
            Estado de origem: <span> {{ politico.ufNasc }} </span>
          </p>
          <p>
            Email: <span> {{ politico.email }} </span>
          </p>
          <p>
            Cidade de origem: <span> {{ politico.municipioNasc }} </span>
          </p>
          <p>
            Endereço gabinete: <span> {{ politico.enderecoGabinete }} </span>
          </p>
          <p>
            Data de nascimento: <span> {{ politico.dataNasc }} </span>
          </p>
        </div>

        <!-- ABA 2 -->
        <table-propostas :politico="politicoSelected" id="propostas" v-if="anterior === 2" />

        <!-- ABA 3 -->
        <GastosChart
          :politico="getObj"
          :politicos="politicosComp"
          id="graphs"
          v-if="anterior === 3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TablePropostas from '../../components/tablePropostas/TablePropostas.vue';
import api from '../../config/api';
import GastosChart from '../../components/gastosChart/GastosChart.vue';

export default {
  name: 'PerfilPolitico',
  components: {
    TablePropostas,
    GastosChart,
  },
  methods: {
    changeTab(tab) {
      switch (tab) {
        default:
          {
            const selected = document.querySelector('.infos');
            const div = document.getElementById('1');
            selected.classList.add('selected-color');
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
            div.classList.add('selected');
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
            selected.classList.remove('selected-color');
            div.classList.remove('selected');
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.remove('selected-color');
            const div = document.getElementById('2');
            div.classList.remove('selected');
          }
          break;

        case 3: {
          const selected = document.querySelector('.mandato');
          selected.classList.remove('selected-color');
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
