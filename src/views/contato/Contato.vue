<template>
    <div class="container">
        <Navbar />
        <div>
            <div class="message-area">
               <h1> Nos mande uma mensagem! </h1>
                <textarea v-model="texto" />
                <select>
                    <option value=0> Escolha o tipo da mensagem </option>
                    <option :key="opt" v-for="opt in options"> {{ opt }} </option>
                </select>
            </div>
            <div class="info-area">
                <input placeholder="Digite seu email" />
                <button @click="sendMessage"> Enviar </button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from '../../components/navbar/Navbar.vue';
import Footer from '../../components/footer/Footer.vue';

export default {
  name: 'Contato',
  data() {
    return {
      texto: '',
      options: ['Sugestão', 'Dúvidas', 'Problemas encontrados'],
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    sendMessage() {
      this.texto = '';
    },
  },
};

</script>

<style lang="scss" src="./styles.scss" scoped />
