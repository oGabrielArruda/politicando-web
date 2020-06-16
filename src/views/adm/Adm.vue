<template>
    <div class="container">
        <div v-> </div>
    </div>
</template>

<script>
import api from '../../config/api';

export default {
  name: 'Adm',
  data() {
    return {
      msgs: [],
    };
  },
  async mounted() {
    try {
      const response = await api.get('/Faq/unsolved');
      this.msgs = response.data;
      console.log(this.msgs);
    } catch (erro) {
      console.log(erro);
    }
  },
};
</script>

<style lang="scss" src="./styles.scss" />
