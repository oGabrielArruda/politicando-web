<template>
  <main>
    <div class="event-item">
      <img src="../../../assets/events/calendarEvent.svg" :class="{ 'image-blur': isOpen1 }"  />
      <div class="content" :class="{ 'content-blur': isOpen1 }">
        <p class="title">Sessão Deliberativa</p>
        <p class="time">23 de abril de 2020</p>
        <button @click="changeEvent(0)" :class="{ 'selected': isOpen1 }">Ver mais...</button>
      </div>
      <div class="other" :class="{ 'other-open': isOpen1 }">
        <button type="button" class="button-close" @click="changeEvent(0)">
          <i class="fas fa-times"></i>
        </button>
        <p>
          <span>Horario:</span> 14:00h
        </p>
        <p>
          <span>Local:</span> Plenário da Câmara dos Deputados
        </p>
        <p>
          <span>Situação:</span> Encerrada
        </p>
      </div>
    </div>
    <div class="event-item">
      <img src="../../../assets/events/calendarEvent.svg" />
      <div class="content">
        <p class="title">Sessão Deliberativa</p>
        <p class="time">23 de abril de 2020</p>
        <button @click="changeEvent(1)" :class="{ 'selected': isOpen2 }">Ver mais...</button>
      </div>
      <div class="other" :class="{ 'other-open': isOpen2 }">
        <p>
          <span>Horario:</span> 14:00h
        </p>
        <p>
          <span>Local:</span> Plenário da Câmara dos Deputados
        </p>
        <p>
          <span>Situação:</span> Encerrada
        </p>
      </div>
    </div>
    <div class="event-item">
      <img src="../../../assets/events/calendarEvent.svg" />
      <div class="content">
        <p class="title">Sessão Deliberativa</p>
        <p class="time">23 de abril de 2020</p>
        <button @click="changeEvent(1)" :class="{ 'selected': isOpen2 }">Ver mais...</button>
      </div>
      <div class="other" :class="{ 'other-open': isOpen2 }">
        <p>
          <span>Horario:</span> 14:00h
        </p>
        <p>
          <span>Local:</span> Plenário da Câmara dos Deputados
        </p>
        <p>
          <span>Situação:</span> Encerrada
        </p>
      </div>
    </div>
    <div class="event-item">
      <img src="../../../assets/events/calendarEvent.svg" />
      <div class="content">
        <p class="title">Sessão Deliberativa</p>
        <p class="time">23 de abril de 2020</p>
        <button @click="changeEvent(1)" :class="{ 'selected': isOpen2 }">Ver mais...</button>
      </div>
      <div class="other" :class="{ 'other-open': isOpen2 }">
        <p>
          <span>Horario:</span> 14:00h
        </p>
        <p>
          <span>Local:</span> Plenário da Câmara dos Deputados
        </p>
        <p>
          <span>Situação:</span> Encerrada
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Events',
  components: {},
  data() {
    return {
      isOpen1: false,
      isOpen2: false,
    };
  },
  methods: {
    changeEvent(i) {
      switch (i) {
        case 1:
          this.isOpen2 = !this.isOpen2;
          break;
        default:
          this.isOpen1 = !this.isOpen1;
          break;
      }
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
