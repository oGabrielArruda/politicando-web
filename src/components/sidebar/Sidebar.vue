<template>
  <nav>
    <div class="content">
      <div class="profile">
        <img
          src="https://avatars2.githubusercontent.com/u/47468017?s=400&u=55cae324327ac3651093aace03e997ac44f2c9f5&v=4"
          alt="User"
        />
        <div>
          <h1>Pedro Nunes</h1>
          <button type="button">Ver perfil</button>
        </div>
      </div>
      <div class="division"></div>
      <div class="items">
        <button
          v-for="(button, index) in buttons"
          :key="index"
          :class="{ 'selected': button.isActive }"
          @click="enableButton(index)"
          v-bind="button"
        >
          <img :src="require(`../../assets/sidebar/${button.srcName}.svg`)" />
          <p>{{ button.text }}</p>
        </button>
      </div>
    </div>
    <button type="button">
      <i class="fas fa-door-open"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  data() {
    return {
      buttons: [
        {
          text: 'Feed de Notícias',
          srcName: 'feed',
          isActive: true,
        },
        {
          text: 'Estatísticas',
          srcName: 'chart',
          isActive: false,
        },
        {
          text: 'Classificação',
          srcName: 'classification',
          isActive: false,
        },
      ],
      buttonSelected: 0,
    };
  },
  methods: {
    pushRouter(i) {
      switch (i) {
        case 1:
          this.$router.push({ name: 'Estatisticas' });
          break;
        case 2:
          this.$router.push({ name: 'Classificacao' });
          break;
        default:
          this.$router.push({ name: 'Feed' });
          break;
      }
    },
    enableButton(i) {
      this.buttons[this.buttonSelected].isActive = false;
      this.buttons[i].isActive = true;
      this.buttonSelected = i;

      this.pushRouter(i);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
