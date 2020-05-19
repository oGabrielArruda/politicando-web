<template>
  <div class="table-container" :class="{ 'border': showBorder }">
    <div class="header">
      <div class="filter-group">
        <select v-model="filtroTipo">
          <option value disabled selected>Tipo de Político</option>
          <option value="">Todos</option>
          <option :value="index+1" :key="tipo.value" v-for="(tipo, index) in tiposDePolitico">
            {{ tipo }}
          </option>
        </select>
        <select v-model="filtroEstado">
          <option value disabled selected>Estado</option>
          <option value="">Todos</option>
          <option :key="estado.value" v-for="estado in estados">{{ estado.sigla }}</option>
        </select>
        <select v-model="filtroPartido">
          <option value disabled selected>Partido</option>
          <option value="">Todos</option>
          <option :key="partido.value" v-for="partido in partidos">{{ partido.sigla }}</option>
        </select>
        <select v-model="filtroClasf">
          <option value disabled selected>Classificar por</option>
          <option :value="valueClasf(clasf)" :key="clasf.value" v-for="clasf in classificativos">
            {{ clasf }}
          </option>
        </select>
      </div>
    </div>
    <table>
      <thead>
        <td></td>
        <th>Nome</th>
        <th>Partido</th>
        <th>Tipo</th>
        <th>Estado</th>
        <th>Gastos <span class="tooltip"
            ><i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="tooltip-text">Os gastos são todas as despesas, incluindo o salário
              dos políticos. São inclídos gastos com combustível, gabinete, e etc. Para
              saber mais, faça o login e visite a página de estátisticas.</span>
              </span>
          </th>
        <th>
          Faltas
          <span class="tooltip"
            ><i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="tooltip-text">As Faltas são avaliadas em todas as sessões, e não no dia.
              Cada falta em uma sessão que estava na agenda de um político é registrada.</span>
            </span>
        </th>
        <th>Presenças <span class="tooltip"
            ><i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="tooltip-text">As Presenças são avaliadas em todas as sessões, e não no dia.
              Cada presença em uma sessão que estava na agenda de um político é registrada.</span>
              </span>
        </th>
        <th>Propostas <span class="tooltip"
            ><i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="tooltip-text">As Propostas representam todos os tipos de preposições
              realizadas por um político, como requerimentos, ementas e leis.</span></span
          ></th>
        <th>Processos <span class="tooltip"
            ><i class="fa fa-info-circle" aria-hidden="true"></i>
            <span class="tooltip-text">Os Processos representam todos os processos judiciais em
              que o político se encontra como réu.</span></span
          ></th>
        <th></th>
      </thead>
      <tbody>
        <tr :key="politico.value" v-for="(politico, index) in filtroPoliticos">
          <td class="classification-column">{{ ((page - 1) * size) + (index + 1) }}°</td>
          <td data-label="Nome" class="name-column">
            <img :src="politico.foto" />
            <p>{{ politico.nome }}</p>
          </td>
          <td data-label="Partido" class="label-exists">{{ politico.partido }}</td>
          <td data-label="Tipo" class="label-exists" v-if="politico.tipo == 1">Deputado Federal</td>
          <td data-label="Tipo" class="label-exists" v-else>Senador</td>
          <td data-label="Estado" class="label-exists">{{ politico.estado }}</td>
          <td data-label="Gastos" class="label-exists">
            {{ "R$" + Math.round(politico.gastos).toLocaleString("pr-BR") }}
          </td>
          <td data-label="Faltas" class="label-exists">{{ politico.faltas }}</td>
          <td data-label="Presenças" class="label-exists">{{ politico.presencas }}</td>
          <td data-label="Propostas" class="label-exists">{{ politico.propostas }}</td>
          <td data-label="Processos" class="label-exists">{{ politico.processos }}</td>
          <td v-if="ehPoliticoFixo(politico) === false" data-label class="follow-button"
          :class="{ 'following': politico.seguindo }">
            <div>
              <button type="button"
              @click="politico.seguindo ? unfollow(index) : follow(index)">
                {{ politico.text }}
              </button>
            </div>
          </td>
        </tr>
        <half-circle-spinner
        class="spinner"
        v-show="loading"
        :size="100"
        :color="'#5de63e'"
        />
      </tbody>
    </table>
    <center>
      <div class="pagination">
        <button @click="page = 1" class="btnPage" :disabled="page === 1">
          <i class="fas fa-angle-double-left"></i>
        </button>
        <button @click="changePageDown" class="btnPage" :disabled="page === 1">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="actual-page">
          {{ page }}
        </div>
        <button @click="changePageUp" class="btnPage" :disabled="page === totalPages">
          <i class="fas fa-chevron-right"></i>
        </button>
        <button @click="page = totalPages" class="btnPage" :disabled="page === totalPages">
          <i class="fas fa-angle-double-right"></i>
        </button>
      </div>
    </center>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { HalfCircleSpinner } from 'epic-spinners';
import api from '../../config/api';

export default {
  name: 'Table',
  data() {
    return {
      tiposDePolitico: ['Deputados', 'Senadores'],
      partidos: [],
      estados: [],
      classificativos: [
        'Alfabeto',
        'Mais Gastos',
        'Menos Gastos',
        'Faltas',
        'Presenças',
        'Propostas',
        'Processos',
      ],
      politicos: '',
      url: '/PoliticoItems/filtrado',
      filtroEstado: '',
      filtroPartido: '',
      filtroTipo: '',
      filtroClasf: '',
      page: 1,
      totalPages: 1,
      loading: false,
    };
  },
  props: ['filtroNome', 'size', 'showBorder'],
  components: {
    HalfCircleSpinner,
  },
  async mounted() {
    try {
      const responsePartidos = await api.get('/Partidos');
      this.partidos = responsePartidos.data;

      const responseEstados = await api.get('/estados');
      this.estados = responseEstados.data;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    async follow(i) {
      if (!this.authenticated) {
        this.$toast.info('Você precisa criar uma conta antes!');
        return;
      }

      try {
        await api.post('/Users/follow', {
          idUser: this.user.id,
          idPolitico: this.filtroPoliticos[i].id,
        });

        this.filtroPoliticos[i].text = 'Seguindo';
        this.filtroPoliticos[i].seguindo = true;
        this.$toast.success(`Você seguiu ${this.filtroPoliticos[i].nome}`);
      } catch (err) {
        console.log(err);
      }
    },
    async unfollow(i) {
      try {
        await api.post('/Users/unfollow', {
          idUser: this.user.id,
          idPolitico: this.filtroPoliticos[i].id,
        });

        this.filtroPoliticos[i].text = 'Seguir';
        this.filtroPoliticos[i].seguindo = false;
        this.$toast.success(`Você deixou de seguir ${this.filtroPoliticos[i].nome}`);
      } catch (err) {
        console.log(err);
      }
    },
    ehPoliticoFixo(politico) {
      if (this.user === null) { return false; }
      if (this.user.idSen === politico.id) { return true; }
      if (this.user.idDep === politico.id) { return true; }
      return false;
    },
    changePageUp() {
      this.page += 1;
    },
    changePageDown() {
      if (this.page > 1) {
        this.page -= 1;
      }
    },
    valueClasf(clasfStr) {
      const clasfSemAcento = clasfStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      return clasfSemAcento.toLowerCase();
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      authenticated: 'auth/authenticated',
    }),
    queryParams() {
      let objQry = {
        page: this.page,
        size: this.size,
        nome: this.filtroNome,
        tipo: this.filtroTipo,
        estado: this.filtroEstado,
        partido: this.filtroPartido,
        clasf: this.filtroClasf,
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
  asyncComputed: {
    async filtroPoliticos() {
      this.loading = true;
      try {
        const response = await api.get(this.url, {
          params: this.queryParams,
        });
        this.totalPages = response.data.totalPages;
        const data = response.data.politicos.map((t) => ({
          ...t,
          text: t.seguindo ? 'Seguindo' : 'Seguir',
        }));
        return data;
      } catch (erro) {
        this.page = 1;
        this.loading = false;
        return null;
      }
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
