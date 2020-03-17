<template>
  <div class="table-container">
    <div class="header">
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
          <option value disabled selected>Classificar por</option>
          <option value="0">Gastos</option>
          <option value="1">Faltas</option>
          <option value="2">Presenças</option>
          <option value="2">Propostas</option>
          <option value="2">Procesos</option>
        </select>
      </div>
      <div class="filters">
        <h3 class="filtro-tipo">Deputados</h3>
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
        <tr>
          <td class="classification-column">1°</td>
          <td data-label="Nome" class="name-column">
            <img src="https://placehold.it/360x270" />
            <p>Logan Henderson</p>
          </td>
          <td data-label="Partido" class="label-exists">PMDB</td>
          <td data-label="Tipo" class="label-exists">Deputado Federal</td>
          <td data-label="Estado" class="label-exists">SP</td>
          <td data-label="Gastos" class="label-exists">R$90.250,35</td>
          <td data-label="Faltas" class="label-exists">60</td>
          <td data-label="Presenças" class="label-exists">220</td>
          <td data-label="Propostas" class="label-exists">2308</td>
          <td data-label="Processos" class="label-exists">1</td>
          <td data-label class="follow-button">
            <div>
              <button type="button">Seguir</button>
            </div>
          </td>
        </tr>
        <tr>
          <td data-label class="classification-column">2°</td>
          <td data-label="Nome" class="name-column ">
            <img src="https://placehold.it/360x270" />
            <p>Susi Carlson</p>
          </td>
          <td data-label="Partido" class="label-exists">MDB</td>
          <td data-label="Tipo" class="label-exists">Deputado Federal</td>
          <td data-label="Estado" class="label-exists">RS</td>
          <td data-label="Gastos" class="label-exists">R$200.900,00</td>
          <td data-label="Faltas" class="label-exists">45</td>
          <td data-label="Presenças" class="label-exists">250</td>
          <td data-label="Propostas" class="label-exists">1541</td>
          <td data-label="Processos" class="label-exists">9</td>
          <td data-label class="follow-button">
            <div>
              <button type="button">Seguir</button>
            </div>
          </td>
        </tr>
        <tr>
          <td data-label class="classification-column">3°</td>
          <td data-label="Nome" class="name-column">
            <img src="https://placehold.it/360x270" />
            <p>Markus Benes</p>
          </td>
          <td data-label="Partido" class="label-exists">PSL</td>
          <td data-label="Tipo" class="label-exists">Deputado Federal</td>
          <td data-label="Estado" class="label-exists">AM</td>
          <td data-label="Gastos" class="label-exists">R$1.000.000,00</td>
          <td data-label="Faltas" class="label-exists">90</td>
          <td data-label="Presenças" class="label-exists">210</td>
          <td data-label="Propostas" class="label-exists">1309</td>
          <td data-label="Processos" class="label-exists">10</td>
          <td data-label class="follow-button following">
            <div>
              <button type="button">Seguindo</button>
            </div>
          </td>
        </tr>
        <tr>
          <td data-label class="classification-column">4°</td>
          <td data-label="Nome" class="name-column">
            <img src="https://placehold.it/360x270" />
            <p>Marie Stephens</p>
          </td>
          <td data-label="Partido" class="label-exists">PSOL</td>
          <td data-label="Tipo" class="label-exists">Senador</td>
          <td data-label="Estado" class="label-exists">SP</td>
          <td data-label="Gastos" class="label-exists">R$25.150,90</td>
          <td data-label="Faltas" class="label-exists">10</td>
          <td data-label="Presenças" class="label-exists">400</td>
          <td data-label="Propostas" class="label-exists">1300</td>
          <td data-label="Processos" class="label-exists">3</td>
          <td data-label class="follow-button">
            <div>
              <button type="button">Seguir</button>
            </div>
          </td>
        </tr>
        <tr>
          <td data-label class="classification-column">5°</td>
          <td data-label="Nome" class="name-column">
            <img src="https://placehold.it/360x270" />
            <p>Jacob Gibson</p>
          </td>
          <td data-label="Partido" class="label-exists">PT</td>
          <td data-label="Tipo" class="label-exists">Deputado Federal</td>
          <td data-label="Estado" class="label-exists">SP</td>
          <td data-label="Gastos" class="label-exists">R$920.000,00</td>
          <td data-label="Faltas" class="label-exists">120</td>
          <td data-label="Presenças" class="label-exists">134</td>
          <td data-label="Propostas" class="label-exists">1073</td>
          <td data-label="Processos" class="label-exists">0</td>
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
export default {
  name: 'Table',
  data() {
    return {};
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
