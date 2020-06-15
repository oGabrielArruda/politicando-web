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
                <input placeholder="Digite seu email" v-model="email"/>
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
      email: '',
      options: ['Sugestão', 'Dúvidas', 'Problemas encontrados'],
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.texto = '';
      /* Email.send({
        SecureToken: '6d86335f-f6a9-458c-a797-9854288c0ea1',
        To: 'gabrielarruda1@cooltura.com.br',
        From: this.email,
        Subject: 'This is the subject',
        Body: 'And this is the body',
      }).then(
        (message) => console.log(message),
      );
    }, */
    },
  },
  mounted() {
    const smtpScript = document.createElement('script');
    smtpScript.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
    document.head.appendChild(smtpScript);
    smtpScript.async = true;
  },
};

</script>


<style lang="scss" src="./styles.scss" scoped />
