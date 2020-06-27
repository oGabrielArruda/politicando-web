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
        <p>
          Cargo: <span> {{ this.getCargoPolitico() }} </span>
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
          <p class="mandato" @click="changeTab(2)">Classificações</p>
          <div id="3"></div>
        </div>
      </div>

      <div class="tab-contents">
        <!-- ABA 1 -->
        <div class="infoPolitico" v-if="anterior === 1">
          <p>
            Nome completo: <br /><br />
            <span> {{ politico.nomeCompleto }} </span>
          </p>
          <p>
            Telefone: <br /><br />
            <span> {{ politico.telefone }} </span>
          </p>
          <p>
            Estado de origem: <br /><br />
            <span> {{ politico.ufNasc }} </span>
          </p>
          <p>
            Email: <br /><br />
            <span> {{ politico.email }} </span>
          </p>
          <p>
            Cidade de origem: <br /><br />
            <span> {{ politico.municipioNasc }} </span>
          </p>
          <p>
            Endereço gabinete: <br /><br />
            <span> {{ politico.enderecoGabinete }} </span>
          </p>
          <p>
            Data de nascimento: <br /><br />
            <span> {{ this.getDataPolitico() }} </span>
          </p>
        </div>

        <!-- ABA 2 -->
        <table-propostas :politico="politicoSelected" v-if="anterior === 2" />

        <!-- ABA 3 -->

        <p class="classification-title" v-if="anterior === 3">
          As classificações de {{ politicoSelected.nome }} são as seguintes:
        </p>
        <div class="classificacao" v-if="anterior === 3">
          <div class="cards">
            <p class="card-title">Mais Gastos</p>
            <div class="dados">
              {{ this.getPosition(this.politico.idPolitico, 1) }}º
            </div>
          </div>

          <div class="cards">
            <p class="card-title">Mais Faltas</p>
            <div class="dados">{{ this.getPosition(this.politico.idPolitico, 3) }}º</div>
          </div>

          <div class="cards">
            <p class="card-title">Mais Presenças</p>
            <div class="dados">{{ this.getPosition(this.politico.idPolitico, 4) }}º</div>
          </div>

          <div class="cards">
            <p class="card-title">Mais Propostas</p>
            <div class="dados">{{ this.getPosition(this.politico.idPolitico, 5) }}º</div>
          </div>

          <div class="cards">
            <p class="card-title">Mais Processos</p>
            <div class="dados">{{ this.getPosition(this.politico.idPolitico, 6) }}º </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TablePropostas from '../../components/tablePropostas/TablePropostas.vue';
import api from '../../config/api';

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
            const div = document.getElementById('1');
            selected.classList.add('selected-color');
            div.classList.add('selected');
            if (this.anterior !== 1) {
              this.removeColor(this.anterior);
            }
            this.anterior = 1;
          }
          break;
        case 1:
          {
            const selected = document.querySelector('.classificacao');
            selected.classList.add('selected-color');
            const div = document.getElementById('2');
            div.classList.add('selected');
            if (this.anterior !== 2) {
              this.removeColor(this.anterior);
            }
            this.anterior = 2;
          }
          break;
        case 2:
          {
            const selected = document.querySelector('.mandato');
            selected.classList.add('selected-color');
            const div = document.getElementById('3');
            div.classList.add('selected');
            if (this.anterior !== 3) {
              this.removeColor(this.anterior);
            }
            this.anterior = 3;
          }
          break;
      }
    },
    getDataPolitico() {
      const dia = this.politico.dataNasc.substring(8, 10);
      const mes = this.politico.dataNasc.substring(5, 7);
      const ano = this.politico.dataNasc.substring(0, 4);
      return `${dia}/${mes}/${ano}`;
    },
    getCargoPolitico() {
      if (this.politicoSelected.tipo === 1) return 'Deputado Federal';
      return 'Senador';
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
    // metodo para pegar a posicao do politico de acordo com o filtro
    getPosition(idPolitico, classificativo) {
      // variavel pra usar no while
      let i = 0;
      // variavel para sair do while
      let achou = false;

      while (i < 700 && achou === false) {
        if (this.matrizClassificacoes[classificativo].politicos[i].id === idPolitico) {
          achou = true;
          i += 1;
          return i;
        }
        i += 1;
      }
      // se nao achar e o i passar de 600 retorna que é maior que 600
      return 'Maior que 600';
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

      const promisesArrClasf = [];
      this.classificativos.forEach((t) => {
        promisesArrClasf.push(
          api.get('/PoliticoItems/filtrado', {
            params: {
              size: 700,
              page: 1,
              clasf: t,
            },
          }),
        );
      });
      const arrClasfBruto = await Promise.all(promisesArrClasf);
      const arrClasf = [];
      arrClasfBruto.forEach((t) => {
        arrClasf.push(t.data);
      });
      this.matrizClassificacoes = arrClasf;
      console.log(this.matrizClassificacoes);
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      anterior: 1,
      divAnterior: 1,
      politico: 1,
      url: '/PoliticoItems/filtrado',
      listaPorGasto: [],
      matrizClassificacoes: [],
      classificativos: [
        'alfabeto',
        'mais gastos',
        'menos gastos',
        'faltas',
        'presencas',
        'propostas',
        'processos',
      ],
      posicaoPropostas: 'Maior que 600',
      posicaoGastos: 'Maior que 600',
      posicaoProcessos: 'Maior que 600',
      posicaoFaltas: 'Maior que 600',
      posicaoPresencas: 'Maior que 600',
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
    queryParams(filtroDaVez) {
      let objQry = {
        page: 1,
        size: 600,
        clasf: filtroDaVez,
      };

      if (this.user) {
        objQry = {
          ...objQry,
          idUser: this.user.id,
        };
      }
      return objQry;
    },
  },
  watch: {
    filtroPoliticos: function a() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
