<template>
  <div>
    <h1>Pesquise os deputados e senadores</h1>
    <div id="cont">
      <div id="filtros">
        <select v-model="filtroPessoasSelecionado">
          <option v-for="tipo in tiposDePessoas" >{{ tipo }}</option>
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
      deputados: [],
      senadores: [],
      tiposDePessoas: ["Deputados e Senadores", "Deputados", "Senadores"],
      estatiticas: ['Gastos', 'Propostas', 'Processos', 'Faltas', 'Presenças'],
      partidos: [],

      filtroPessoasSelecionado: 'Deputados e Senadores',
      filtroEstatitica: '',
      filtroPartido: '',
    };
  },

  mounted() {
    axios
    .get("https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome")
    .then(res => {
      this.deputados = res.data.dados;
      console.log(this.deputados);
    })
    .catch(erro => {
      console.log(erro);
    });

    axios
    .get("http://legis.senado.leg.br/dadosabertos/senador/lista/atual")
    .then(res => {
      this.senadores = res.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
      console.log(this.senadores);
    })
    .catch(erro => {
      console.log(erro);
    });

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
    filtrarPessoas: function(){
      console.log(this.filtroPessoasSelecionado);
    },
  },
};
</script>
<style>
#exibicao {
  margin: 1px solid black;
}
</style>
