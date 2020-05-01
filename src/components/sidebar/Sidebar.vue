<template>
  <nav>
    <div class="content">
      <div class="profile">
        <img v-if="usuario.imgPerfil !== ''"
          :src="usuario.imgPerfil"
          alt="User"
        />
        <img v-else
          src="../../assets/signup/user.svg"
          alt="User"
        />
        <div>
          <h1> {{ this.usuario.nome }}</h1>
          <button
            type="button"
            @click="goToProfile()"
            :class="{ 'profile-selected': profileIsActive }"
          >Ver perfil</button>
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
      profileIsActive: false,
      buttons: [
        {
          text: 'Início',
          srcName: 'home',
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
  props: ['usuario'],
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
      if (this.buttonSelected >= 0) {
        this.buttons[this.buttonSelected].isActive = false;
      } else {
        this.profileIsActive = false;
      }

      this.buttons[i].isActive = true;
      this.buttonSelected = i;

      this.pushRouter(i);
    },
    goToProfile() {
      this.buttons[this.buttonSelected].isActive = false;
      this.profileIsActive = true;
      this.buttonSelected = -1;

      this.$router.push({ name: 'Profile' });
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
