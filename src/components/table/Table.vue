<template>
  <div class="table-container">
    <div class="header">
      <div class="filter-group">
        <select v-model="tipoEscolhido">
          <option value disabled selected>Tipo de Político</option>
          <option v-bind:key="tipo" v-for="tipo in tiposDePolitico">{{tipo}}</option>
        </select>
        <select v-model="estadoEscolhido">
          <option value disabled selected>Estado</option>
          <option v-bind:key="estado" v-for="estado in estados">{{estado}}</option>
        </select>
        <select v-model="partidoEscolhido">
          <option value disabled selected>Partido</option>
          <option value="0">Todos</option>
          <option v-bind:key="partido" v-for="partido in partidos">{{partido}}</option>
        </select>
        <select v-model="classfEscolhido">
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
        <tr v-bind:key="politico" v-for="(politico, index) in politicos">
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
// import axios from 'axios';
import api from '../../config/api';

export default {
  name: 'Table',
  data() {
    return {
      tiposDePolitico: ['Todos', 'Deputados', 'Senadores'],
      partidos: ['PT', 'PDT', 'PSB', 'PSDB'],
      estados: ['SP', 'RJ', 'ES', 'etc'],
      classificativos: [
        'Gastos',
        'Faltas',
        'Presenças',
        'Propostas',
        'Processos',
      ],
      tipoEscolhido: '',
      partidoEscolhido: '',
      estadoEscolhido: '',
      classfEscolhido: '',
      politicos: '',
    };
  },
  async mounted() {
    try {
      const response = await api.get('/politicos');
      this.politicos = response.data;
    } catch (erro) {
      // tratar erro
      console.log('funcionou');
    }
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
