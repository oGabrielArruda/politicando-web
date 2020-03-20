<template>
  <div class="table-container">
    <div class="header">
      <div class="filter-group">
        <select @change="changeTipo($event)">
          <option value disabled selected>Tipo de Político</option>
          <option value="0">Todos</option>
          <option v-bind:key="tipo" v-for="tipo in tiposDePolitico">{{tipo}}</option>
        </select>
        <select @change="changeEstado($event)">
          <option value disabled selected>Estado</option>
          <option value="0">Todos</option>
          <option v-bind:key="estado" v-for="estado in estados">{{estado}}</option>
        </select>
        <select @change="changePartido($event)">
          <option value disabled selected>Partido</option>
          <option value="0">Todos</option>
          <option v-bind:key="partido" v-for="partido in partidos">{{partido.sigla}}</option>
        </select>
        <select>
          <option value disabled selected>Classificar por</option>
          <option v-bind:key="clasf" v-for="clasf in classificativos">{{clasf}}</option>
        </select>
      </div>
      <div class="filters">
        <h3 class="filtro-tipo">Deputados</h3>
        <h3 class="filtro-estado">Estados</h3>
        <h3 class="filtro-partido">PSB</h3>
        <h3 class="filtro-propostas">Propostas</h3>
      </div>
    </div>
    <table>
      <thead>
        <td></td>
        <th>Nome</th>
        <th>Partido</th>
        <th>Tipo</th>
        <th>Estado</th>
        <th>Gastos</th>
        <th>Faltas</th>
        <th>Presenças</th>
        <th>Propostas</th>
        <th>Processos</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-bind:key="politico" v-for="(politico, index) in filtroPoliticos">
          <td class="classification-column">{{index+1}}°</td>
          <td data-label="Nome" class="name-column">
            <img :src="politico.foto" />
            <p>{{politico.nome}}</p>
          </td>
          <td data-label="Partido" class="label-exists">{{politico.partido}}</td>
          <td data-label="Tipo" class="label-exists">{{politico.tipo}}</td>
          <td data-label="Estado" class="label-exists">{{politico.estado}}</td>
          <td data-label="Gastos" class="label-exists">{{politico.gastos}}</td>
          <td data-label="Faltas" class="label-exists">{{politico.faltas}}</td>
          <td data-label="Presenças" class="label-exists">{{politico.presencas}}</td>
          <td data-label="Propostas" class="label-exists">{{politico.propostas}}</td>
          <td data-label="Processos" class="label-exists">{{politico.processos}}</td>
          <td data-label class="follow-button">
            <div>
              <button type="button">Seguir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer"></div>
  </div>
</template>

<script>
import api from '../../config/api';

export default {
  name: 'Table',
  data() {
    return {
      tiposDePolitico: ['Deputados', 'Senadores'],
      partidos: [],
      estados: ['SP', 'RJ', 'ES', 'etc'],
      classificativos: [
        'Gastos',
        'Faltas',
        'Presenças',
        'Propostas',
        'Processos',
      ],
      politicos: '',
      url: '/politicos?',
      filtroEstado: '',
      filtroPartido: '',
      filtroTipo: '',
    };
  },
  async mounted() {
    try {
      const response = await api.get('https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla');
      this.partidos = response.data.dados;
    } catch (erro) {
      console.log(erro);
    }
  },

  methods: {
    changeTipo(event) {
      if (event.target.value !== 0) {
        switch (event.target.value) {
          case 'Deputados':
            this.filtroTipo = '&tipo=Deputado%20Federal';
            break;
          case 'Senadores':
            this.filtroTipo = '&tipo=Senador';
            break;
          default:
        }
      } else { this.filtroPartido = ''; }
    },
    changeEstado(event) {
      if (event.target.value !== '0') this.filtroEstado = `&estado=${event.target.value}`;
      else this.filtroEstado = '';
    },
    changePartido(event) {
      if (event.target.value !== '0') this.filtroPartido = `&partido=${event.target.value}`;
      else this.filtroPartido = '';
    },
    async updateRoute(url) {
      try {
        const response = await api.get(url);
        this.politicos = response.data;
      } catch (erro) {
        console.log(erro);
      }
    },
  },
  computed: {
  },
  asyncComputed: {
    async filtroPoliticos() {
      try {
        console.log(`${this.url}${this.filtroPartido}${this.filtroEstado}${this.filtroTipo}`);
        const response = await api.get(`${this.url}${this.filtroPartido}${this.filtroEstado}${this.filtroTipo}`);
        console.log(response.data);
        return response.data;
      } catch (erro) {
        return this.politicos;
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
