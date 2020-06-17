<template>
    <div class="container">
        <Navbar />
        <div>
            <div class="message-area">
               <h1> Nos mande uma mensagem! </h1>
                <textarea v-model="texto" />
                <select v-model="tipo">
                    <option value=0> Escolha o tipo da mensagem </option>
                    <option :key="opt" v-for="opt in options"> {{ opt }} </option>
                </select>
            </div>
            <div class="info-area">
                <input placeholder="Digite seu email" v-model="email"/>
                <button @click="handleSubmit"> Enviar </button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Footer from '../../components/footer/Footer.vue';
import api from '../../config/api';

export default {
  name: 'Contato',
  data() {
    return {
      texto: '',
      email: '',
      tipo: 0,
      options: ['Sugestão', 'Dúvidas', 'Problemas encontrados', 'Outro'],
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const messageObj = this.getMessageObject();
      await this.sendMessage(messageObj);
      this.$toast.success('Mensagem enviada! Cheque a resposa em seu e-mail!');
      this.texto = '';
      this.email = '';
    },
    getMessageObject() {
      const date = this.generateDate();
      const obj = {
        id: 0,
        email: this.email,
        tipo: this.tipo,
        data: date,
        mensagem: this.texto,
        statusF: 'NÃO RESOLVIDA',
      };
      return obj;
    },
    generateDate() {
      const date = new Date();
      return date.toJSON();
    },
    async sendMessage(messageObj) {
      try {
        console.log(messageObj);
        await api.post('/Faq/send', messageObj);
      } catch (erro) {
        console.log(erro);
      }
    },
  },
};

</script>


<style lang="scss" src="./styles.scss" scoped />
