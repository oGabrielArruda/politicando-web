<template>
  <div>
    <h1>Pesquise os deputados e senadores</h1>
    <div id="cont">
      <div id="filtros">
        <select>
          <option v-for="tipo in tiposDePessoas">
            {{ tipo }}
          </option>
        </select>
        <select>
          <option v-for="partido in partidos"> {{ partido.nome }} </option>
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
      tiposDePessoas: ["Deputados e Senadores", "Deputados", "Senadores"],
      partidos: [],
    };
  },

  created: function(){
     this.$http.get('https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla')
     .then(res => res.json())
     .then(partidosRetornados => {
         this.partidos = partidosRetornados.nome;
         console.log(partidosRetornados+"aaaaa");
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
