<template>
  <div>
    <v-select v-if="multiple" label="nome" :filterable="false" :options="options"
    @search="onSearch($event)" @input="onChange($event)" multiple>
      <template slot="no-options">
        <p>{{text}}</p>
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          <img :src="option.foto" />
          {{ option.nome }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          <img :src="option.foto" />
          {{ option.nome }}
        </div>
      </template>
    </v-select>
    <v-select v-else label="nome" :filterable="false" :options="options" @search="onSearch($event)"
      @input="onChange($event)">
      <template slot="no-options">
        <p>{{text}}</p>
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          <img :src="option.foto" />
          {{ option.nome }}
        </div>
      </template>
      <template slot="selected-option" slot-scope="option">
        <div class="selected d-center">
          <img :src="option.foto" />
          {{ option.nome }}
        </div>
      </template>
    </v-select>
  </div>
</template>
<script>
import vSelect from 'vue-select';
import api from '../../config/api';

export default {
  data() {
    return {
      options: [],
      selected: {},
    };
  },
  props: ['url', 'text', 'multiple'],
  components: {
    vSelect,
  },
  methods: {
    async onSearch(event) {
      try {
        const strSearch = event.replace('%20', ' ');
        const response = await api.get(`${this.url}&nome=${strSearch}&size=15&page=1`);
        this.options = response.data.politicos;
      } catch (erro) {
        this.tratarErroPesquisa(erro);
      }
    },
    tratarErroPesquisa(erro) {
      switch (erro.response.status) {
        case 404: { this.tratarNotFound(); break; }
        default: { console.log(erro); break; }
      }
    },
    tratarNotFound() {
      this.text = 'Nenhum politico encontrado!';
      this.options = [];
    },
    onChange(event) {
      this.$emit('onChange', event);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped/>
