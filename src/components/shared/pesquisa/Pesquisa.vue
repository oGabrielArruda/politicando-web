<template>
  <div>
    <h1>Pesquise os deputados e senadores</h1>
    <div id="cont">
      <div id="filtros">
        <select v-model="filtroPessoasSelecionado">
          <option v-for="tipo in tiposDePessoas" >{{ tipo }}</option>
        </select>
        <select v-model="filtroEstado">
          <option v-for="estado in estados" >{{ estado }}</option>
        </select>
        <select v-model="filtroPartido">
          <option selected> Partido </option>
          <option v-for="partido in partidos">{{ partido.sigla }}</option>
        </select>
        <select v-model="filtroEstatitica">
          <option selected>Estatíticas</option>
          <option v-for="estatitica in estatiticas">{{ estatitica }}</option>
        </select>
      </div>
      <div id="exibicao">
          <ul>
            <li v-for="politico in politicos"></li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Pesquisa",
  data() {
    return {
      politicos: [],
      estados: ['Estado', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
      'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      tiposDePessoas: ["Deputados e Senadores", "Deputados", "Senadores"],
      estatiticas: ['Gastos', 'Propostas', 'Processos', 'Faltas', 'Presenças'],
      partidos: [],

      filtroPessoasSelecionado: 'Deputados e Senadores',
      filtroEstatitica: 'Estatíticas',
      filtroPartido: 'Partido',
      filtroEstado: 'Estado',
    };
  },

  mounted() {
    axios
      .get(
        "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla"      )
      .then(res => {
        this.partidos = res.data.dados;
        console.log(this.partidos);
      })
      .catch(erro => console.log(erro));
  },
  methods:{
  },
};
</script>
<style>
#exibicao {
  margin: 1px solid black;
}
</style>
