<template>
    <div>
        <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="{
        enabled: true
        }">
        </vue-good-table>
    </div>
</template>

<style>

</style>

<script>
import 'vue-good-table/dist/vue-good-table.css';
import { VueGoodTable } from 'vue-good-table';
// import api from '../../config/api';

export default {
  name: 'TablePropostas',
  data() {

  },
  props: ['politico'],
  components: {
    VueGoodTable,
  },
};

</script>
