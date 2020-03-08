<template>
  <div>
    <h1>Pesquise os deputados e senadores</h1>
    <div id="cont">
      <div id="filtros">
        <select>
          <option v-for="tipo in tiposDePessoas">{{ tipo }}</option>
        </select>
        <select>
          <option v-for="partido in partidos">{{ partido.sigla }}</option>
        </select>
      </div>
      <div id="exibicao">
        <ul>
          <li></li>
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
      partidos: [],
    };
  },

  mounted() {
    axios
      .get(
        "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla"
      )
      .then(res => {
        this.partidos = res.data.dados;
        console.log(this.partidos);
      })
      .catch(erro => console.log(erro));
  },
};
</script>
<style>
#exibicao {
  margin: 1px solid black;
}
</style>
