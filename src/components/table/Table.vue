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
        <select @change="changeClasf($event)">
          <option value disabled selected>Classificar por</option>
          <option value="0">Alfabeto</option>
          <option v-bind:key="clasf" v-for="clasf in classificativos">{{clasf}}</option>
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
          <td data-label="Gastos" class="label-exists">{{'R$'+politico.gastos}}</td>
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
        'Mais Gastos',
        'Menos Gastos',
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
      filtroClasf: '',
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
      switch (event.target.value) {
        case 'Deputados':
          this.filtroTipo = '&tipo=Deputado%20Federal';
          break;
        case 'Senadores':
          this.filtroTipo = '&tipo=Senador';
          break;
        default: this.filtroTipo = '';
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
      this.filtroClasf = this.clasfUrl(event.target.value);
    },
    clasfUrl(value) {
      switch (value) {
        case '0': return '';
        case 'Mais Gastos': return '&_sort=gastos&_order=desc';
        case 'Menos Gastos': return '&_sort=gastos&_order=asc';
        case 'Presenças': return '&_sort=presencas&_order=desc';
        default: return `&_sort=${value.toLowerCase()}&_order=desc`;
      }
    },
  },
  computed: {
  },
  asyncComputed: {
    async filtroPoliticos() {
      try {
        const url = `${this.url}${this.filtroPartido}${this.filtroEstado}${this.filtroTipo}${this.filtroClasf}`;
        console.log(url);
        const response = await api.get(url);
        return response.data;
      } catch (erro) {
        return this.politicos;
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
