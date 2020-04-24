<template>
  <div>
    <v-select label="nome" :filterable="false" :options="options" @search="onSearch($event)"
    @input="onChange($event)" v-model="selected">
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
      lastValue: '',
    };
  },
  props: ['url', 'text'],
  components: {
    vSelect,
  },
  methods: {
    async onSearch(event) {
      try {
        const strSearch = event.replace('%20', ' ');
        const response = await api.get(`${this.url}&nome=${strSearch}`);
        this.options = response.data;
      } catch (erro) {
        console.log(erro);
      }
    },
    onChange(event) {
      this.$emit('onChange', { value: event, lastValue: this.lastValue });
      this.lastValue = event;
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped/>
