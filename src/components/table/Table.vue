<template>
  <div class="table-container" :class="{ 'border': showBorder }">
    <div class="header">
      <div class="filter-group">
        <select @change="changeTipo($event)">
          <option value disabled selected>Tipo de Político</option>
          <option value="0">Todos</option>
          <option :key="tipo.value" v-for="tipo in tiposDePolitico">{{ tipo }}</option>
        </select>
        <select @change="changeEstado($event)">
          <option value disabled selected>Estado</option>
          <option value="0">Todos</option>
          <option :key="estado.value" v-for="estado in estados">{{ estado.sigla }}</option>
        </select>
        <select @change="changePartido($event)">
          <option value disabled selected>Partido</option>
          <option value="0">Todos</option>
          <option :key="partido.value" v-for="partido in partidos">{{ partido.sigla }}</option>
        </select>
        <select @change="changeClasf($event)">
          <option value disabled selected>Classificar por</option>
          <option value="0">Alfabeto</option>
          <option :key="clasf.value" v-for="clasf in classificativos">{{ clasf }}</option>
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
          <td data-label class="follow-button" :class="{ 'following': politico.seguindo }">
            <div>
              <button type="button"
              @click="politico.seguindo ? unfollow(index) : follow(index)">
                {{ politico.text }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <center>
      <div class="pagination">
        <button @click="changePageDown" class="btnPage" :disabled="this.page == 1">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="actual-page">
          {{ page }}
        </div>
        <button @click="changePageUp" class="btnPage" :disabled="!isNextPageEnabled">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </center>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../../config/api';

export default {
  name: 'Table',
  data() {
    return {
      tiposDePolitico: ['Deputados', 'Senadores'],
      partidos: [],
      estados: [],
      classificativos: [
        'Mais Gastos',
        'Menos Gastos',
        'Faltas',
        'Presenças',
        'Propostas',
        'Processos',
      ],
      politicos: '',
      url: '/PoliticoItems/filtrado?',
      filtroEstado: '',
      filtroPartido: '',
      filtroTipo: '',
      filtroClasf: '',
      page: 1,
      isNextPageEnabled: true,
    };
  },
  props: ['filtroNome', 'size', 'showBorder'],
  async mounted() {
    try {
      const responsePartidos = await api.get('/Partidos');
      this.partidos = responsePartidos.data;

      const responseEstados = await api.get('/estados');
      this.estados = responseEstados.data;
    } catch (erro) {
      console.log(erro);
    }
  },

  methods: {
    async follow(i) {
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
    changeTipo(event) {
      switch (event.target.value) {
        case 'Deputados':
          this.filtroTipo = '&tipo=1';
          break;
        case 'Senadores':
          this.filtroTipo = '&tipo=2';
          break;
        default:
          this.filtroTipo = '';
      }
      console.log(this.filtroPartido);
    },
    changeEstado(event) {
      if (event.target.value !== '0') this.filtroEstado = `&estado=${event.target.value}`;
      else this.filtroEstado = '';
    },
    changePartido(event) {
      if (event.target.value !== '0') this.filtroPartido = `&partido=${event.target.value}`;
      else this.filtroPartido = '';
    },
    changeClasf(event) {
      switch (event.target.value) {
        case '0':
          this.filtroClasf = '';
          break;
        case 'Mais Gastos':
          this.filtroClasf = '&clasf=mais%20gastos';
          break;
        case 'Menos Gastos':
          this.filtroClasf = '&clasf=menos%20gastos';
          break;
        case 'Presenças':
          this.filtroClasf = '&clasf=presencas';
          break;
        case 'Faltas':
          this.filtroClasf = '&clasf=faltas';
          break;
        case 'Propostas':
          this.filtroClasf = '&clasf=propostas';
          break;
        default:
          this.filtroClasf = '&clasf=processos';
      }
    },
    changePageUp() {
      this.page += 1;
    },
    changePageDown() {
      if (this.page > 1) {
        this.page -= 1;
      }
    },
    async isNextPageWithData() {
      try {
        const url = `${this.url}
        &size=${this.size}
        &page=${this.page + 1}
        ${this.filtroNome}
        ${this.filtroPartido}
        ${this.filtroEstado}
        ${this.filtroTipo}
        ${this.filtroClasf}
        `;
        const response = await api.get(url);
        if (response) {
          return true;
        }
        return true;
      } catch (erro) {
        return false;
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  asyncComputed: {
    async filtroPoliticos() {
      try {
        const nextPageWithData = this.isNextPageWithData();
        console.log(this.url);
        let { url } = this;
        url += `&size=${this.size}`;
        url += `&page=${this.page}`;

        if (this.filtroNome) { url += this.filtroNome; }
        if (this.filtroPartido) { url += this.filtroPartido; }
        if (this.filtroEstado) { url += this.filtroEstado; }
        if (this.filtroTipo) { url += this.filtroTipo; }
        if (this.filtroClasf) { url += this.filtroClasf; }
        if (this.user) { url += `&idUser=${this.user.id}`; }
        console.log(url);
        const response = await api.get(url);
        this.isNextPageEnabled = await nextPageWithData;


        const data = response.data.map((t) => ({
          ...t,
          text: t.seguindo ? 'Seguindo' : 'Seguir',
        }));

        console.log(data);
        return data;
      } catch (erro) {
        this.page = 1;
        return null;
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
