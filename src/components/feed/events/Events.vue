<template>
  <main v-if="isLoading">
    <div class="day">
      <p>Próximos Eventos</p>
      <hr />
      <div class="order-content">
        <div class="event-item" v-for="(e, index) in eventsDay" :key="e.idEvento" v-bind="e">
          <img src="../../../assets/events/calendarEvent.svg" :class="{ 'image-blur': e.isOpen }" />
          <div class="content" :class="{ 'content-blur': e.isOpen }">
            <p class="title">{{ e.descFormatted }}</p>
            <p class="time">{{ e.dateFormatted }}</p>
            <button @click="showMoreEventDay(index)"
            :class="{ 'selected': e.isOpen }">Ver mais...</button>
          </div>
          <div class="other" :class="{ 'other-open': e.isOpen }">
            <button type="button" class="button-close" @click="showMoreEventDay(index)">
              <i class="fas fa-times"></i>
            </button>
            <p>
              <span>Horario:</span>
              {{ e.hora }}h
            </p>
            <p>
              <span>Local:</span>
              {{ e.local }}
            </p>
            <p>
              <span>Situação:</span>
              {{ e.situacao }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="moth">
      <p>Eventos do mês</p>
      <hr />
      <div class="order-content">
        <div class="event-item" v-for="(e, index) in eventsMonth" :key="e.idEvento" v-bind="e">
          <img src="../../../assets/events/calendarEvent.svg" :class="{ 'image-blur': e.isOpen }" />
          <div class="content" :class="{ 'content-blur': e.isOpen }">
            <p class="title">{{ e.descFormatted }}</p>
            <p class="time">{{ e.dateFormatted }}</p>
            <button @click="showMoreEventMonth(index)"
            :class="{ 'selected': e.isOpen }">Ver mais...</button>
          </div>
          <div class="other" :class="{ 'other-open': e.isOpen }">
            <button type="button" class="button-close" @click="showMoreEventMonth(index)">
              <i class="fas fa-times"></i>
            </button>
            <p>
              <span>Horario:</span>
              {{ e.hora }}h
            </p>
            <p>
              <span>Local:</span>
              {{ e.local }}
            </p>
            <p>
              <span>Situação:</span>
              {{ e.situacao }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <LoadingTemplate v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../../config/api';

import LoadingTemplate from './loadingTemplate/LoadingTemplate.vue';

export default {
  name: 'Events',
  data() {
    return {
      isOpen1: false,
      isOpen2: false,
      eventsDay: [],
      eventsMonth: [],
      updating: false,
      loading: false,
    };
  },
  components: {
    LoadingTemplate,
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
    showMoreEventDay(i) {
      this.eventsDay[i].isOpen = !this.eventsDay[i].isOpen;
    },
    showMoreEventMonth(i) {
      this.eventsMonth[i].isOpen = !this.eventsMonth[i].isOpen;
    },
    async getEvents(id, tipo) {
      let teste1 = 'SESSÃO DELIBERATIVA REMOTA';
      teste1 = teste1
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

      console.log(teste1);

      await this.getEventsDay(tipo);
      await this.getEventsMonth(id, tipo);

      this.loading = false;
      this.updating = false;
    },

    async getEventsDay(tipo) {
      const response = await api.get(`/Eventos/Prox/${tipo}`);

      this.eventsDay = this.changeData(response.data);

      console.log(this.eventsDay);
    },

    async getEventsMonth(id, tipo) {
      const initialDate = this.getDateInterval(30);
      const response = await api.get(`/Eventos/${id}/${tipo}/${initialDate}`);

      this.eventsMonth = this.changeData(response.data);

      console.log(this.eventsMonth);
    },

    getDateInterval(offset) {
      const date = new Date();

      date.setDate(date.getDate() - offset);
      const initialMonth = date.getMonth() + 1;
      const initialDate = `${date.getFullYear()}-${
        initialMonth < 10 ? `0${initialMonth}` : initialMonth
      }-${date.getDate()}`;

      return initialDate;
    },

    changeData(events) {
      const data = events.map((event) => ({
        ...event,
        descFormatted: event.descricao
          .toLowerCase()
          .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase()),
        dateFormatted: format(new Date(event.data), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        isOpen: false,
      }));

      return data;
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
    }),
    isLoading() {
      return !this.loading;
    },
  },
  watch: {
    politicoSelected() {
      if (!this.updating) {
        this.loading = true;
        const { id, tipo } = this.politicoSelected;
        this.getEvents(id, tipo);
      }
    },
  },
  beforeMount() {
    if (this.politicoSelected) {
      this.updating = true;
    }
  },
  mounted() {
    if (this.updating) {
      this.loading = true;
      const { id, tipo } = this.politicoSelected;
      this.getEvents(id, tipo);
    }
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
