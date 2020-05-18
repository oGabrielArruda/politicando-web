<template>
  <div class="container">
    <div class="header">
      <div class="foto-politico">
        <img
          src="https://www.gazetaesportiva.com/wp-content/uploads/imagem/2020/03/28/neymar.jpg"
          alt=""
        />
        <br />
        <button>Seguir</button>
      </div>
      <div class="info-politico">
        <p>Nome eleitoral: <span>Eminem Abreu John Lennon </span></p>
        <p>Partido: <span>Partido Trabalhista (PT)</span></p>
        <p>Estado de Origem: <span>Amazonas (AM)</span></p>
        <p>Numero de Processos: <span>542</span></p>
        <p>Cidade de Origem: <span>São Paulo</span></p>
      </div>
    </div>
    <div class="tabs">
      <div class="options">
        <h2 class="infos">Informações Pessoais</h2>
        <h2 class="classificacao">Classificação</h2>
        <h2 class="mandato">Informações Mandato</h2>
      </div>
      <div class="selected"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PerfilPolitico',
  data() {
    return {};
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
