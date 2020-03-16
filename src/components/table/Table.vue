<template>
  <div class="table-container">
    <div class="header">
      <h2>Filtrar por:</h2>
      <div class="filter-group">
        <select>
          <option value disabled selected>Tipo de Político</option>
          <option value="0">Todos</option>
          <option value="1">Deputados</option>
          <option value="2">Senadores</option>
        </select>
        <select>
          <option value disabled selected>Partido</option>
          <option value="0">Todos</option>
          <option value="1">PT</option>
          <option value="2">PDT</option>
          <option value="2">PSB</option>
          <option value="2">PSDB</option>
          <option value="2">PSL</option>
        </select>
        <select>
          <option value disabled selected>Classificar por:</option>
          <option value="0">Gastos</option>
          <option value="1">Faltas</option>
          <option value="2">Presenças</option>
          <option value="2">Propostas</option>
          <option value="2">Procesos</option>
        </select>
      </div>
      <div class="filters">
        <h3>Todos</h3>
        <h3>Propostas</h3>
      </div>
    </div>
    <table>
      <!-- CONTEUDO -->
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {};
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
