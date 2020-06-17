<template>
    <div class="container">
        <h1> Mensagens de usuários </h1>
        <div>
          <table border="1px" cellpadding="5px" cellspacing="0" ID="alter">
              <thead>
              <tr>
                  <td> Id </td>
                  <td> Mensagem </td>
                  <td> Email </td>
                  <td> Data </td>
                  <td> Status </td>
                  <td> Tipo </td>
              </tr>
              </thead>
              <tr :key="msg.id" v-for="msg in msgs">
                  <td> {{msg.id}} </td>
                  <td> {{msg.mensagem}} </td>
                  <td> {{msg.email}} </td>
                  <td> {{msg.data}} </td>
                  <td> {{msg.statusF}} </td>
                  <td> {{msg.tipo}} </td>
                  <td>
                      <button @click="handleSolveClick(msg.id)"> Resolver </button>
                  </td>
              </tr>
          </table>
        </div>
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
  methods: {
    async handleSolveClick(id) {
      try {
        await api.post(`/Faq/solve/${id}`);
        this.msgs = this.msgs.filter((t) => t.id !== id);
        this.$toast.success('Resolvido!');
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
