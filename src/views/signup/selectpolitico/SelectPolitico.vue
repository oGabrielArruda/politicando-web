<template>
    <div>
        <v-select label="nome" :filterable="false" :options="options"
        @search="onSearch()" >
        <template slot="no-options">
         {{text}}
        </template>
        <template slot="option" slot-scope="option">
          <div class="d-center">
              <img :src='option.foto' />
              {{ option.nome }}
          </div>
        </template>
        <template slot="selected-option" slot-scope="option">
            <div class="selected d-center">
            <img :src='option.foto'/>
            {{ option.nome }}
            </div>
        </template>
        </v-select>
    </div>
</template>
<script>
import vSelect from 'vue-select';
import api from '../../../config/api';

export default {
  data() {
    return {
      options: [],
      search: '',
    };
  },
  props: ['url', 'text'],
  components: {
    vSelect,
  },
  methods: {
    async onSearch() {
      try {
        const response = await api.get(`${this.url}?q=${this.search}`);
        this.options = response.data;
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}

.v-select {
    width: 300px;
}
</style>
