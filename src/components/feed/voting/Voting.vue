<template>
  <main v-if="isLoading">
    <div
      class="voting-item"
      v-for="(n, index) in votes"
      :key="index"
      v-bind="n"
      :class="[{'approved': n.isApproved},{'disapproved': !n.isApproved}]"
    >
      <div class="top">
        <p>{{ n.situation }}</p>
        <i class="fas fa-thumbs-up" v-if="n.isApproved"></i>
        <i class="fas fa-thumbs-down" v-else></i>
      </div>
      <div class="content">
        <header>
          <p>{{ n.descricao }}</p>
        </header>
        <footer>
          <p>{{ n.dateFormatted }}</p>
        </footer>
      </div>
    </div>
    <LoadingMore v-if="isLoadingMore" />
    <Observer v-on:intersect="intersected" />
  </main>
  <LoadingTemplate v-else />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../config/api';

import Observer from '../../observer/Observer.vue';
import LoadingMore from '../../loadingMore/LoadingMore.vue';
import LoadingTemplate from './loadingTemplate/LoadingTemplate.vue';

export default {
  name: 'Voting',
  data() {
    return {
      votes: [],
      updating: false,
      loading: false,
      loadingMore: false,
      page: 1,
      totalPages: 1,
      requested: 0,
      politicoId: null,
      politicoType: null,
    };
  },
  components: {
    Observer,
    LoadingMore,
    LoadingTemplate,
  },
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
    }),
    async getVotes(id, type) {
      const { initialDate, finalDate } = this.getDateInterval(360);

      const response = await api.get(
        `/Votacoes/${id}/${type}/${initialDate}/${finalDate}`,
        {
          params: {
            page: this.page,
          },
        },
      );

      if (this.page === 1) {
        // this.totalPages = response.data.totalPages;
      }

      const approved = 'APROVADA';
      const disapproved = 'REJEITADA';
      const data = response.data.map((voting) => ({
        ...voting,
        dateFormatted: format(
          new Date(voting.dataVoto),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt },
        ),
        situation: voting.valorVoto === 'Sim' ? approved : disapproved,
        isApproved: voting.valorVoto === 'Sim' || false,
      }));

      this.votes = [...this.votes, ...data];
      console.log(this.votes);
      this.loading = false;
      this.loadingMore = false;
      this.requested = 0;

      if (this.updating) {
        this.updating = false;
      }
    },
    getDateInterval(offset) {
      const date = new Date();

      const finalDate = `${date.getFullYear()}-${date.getMonth()
        + 1}-${date.getDate()}`;

      date.setDate(date.getDate() - offset);
      const initialMonth = date.getMonth() + 1;
      const initialDate = `${date.getFullYear()}-${
        initialMonth < 10 ? `0${initialMonth}` : initialMonth
      }-${date.getDate()}`;

      return {
        initialDate,
        finalDate,
      };
    },
    intersected() {
      this.requested += 1;
      if (this.requested === 1) {
        this.page += 1;

        /* if (this.page > this.totalPages) {
          return;
        } */

        this.loadingMore = true;
        this.getVotes(this.politicoId, this.politicoType);
      }
    },
    resetVariables() {
      this.loading = true;
      this.loadingMore = false;

      this.page = 1;
      this.requested = 0;
      this.votes = [];

      const { id, tipo } = this.politicoSelected;
      this.politicoId = id;
      this.politicoType = tipo;
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
    }),
    isLoading() {
      return !this.loading;
    },
    isLoadingMore() {
      return this.loadingMore;
    },
  },
  watch: {
    politicoSelected() {
      if (!this.updating) {
        this.resetVariables();
        this.getVotes(this.politicoId, this.politicoType);
      }
    },
  },
  beforeMount() {
    this.changeSelectedNav(2);
    if (this.politicoSelected) {
      this.updating = true;
    }
  },
  mounted() {
    if (this.updating) {
      this.resetVariables();

      this.getVotes(this.politicoId, this.politicoType);
    }
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped  />
