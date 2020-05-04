<template>
  <main v-if="isLoading">
    <div class="news-item" v-for="(n, index) in news" :key="n.id" v-bind="n">
      <img :src="n.urlImg" v-if="n.imageExists" />
      <div class="news-content">
        <header>
          <p class="title">{{ n.titulo }}</p>
          <p class="description">{{ n.descricao }}</p>
        </header>
        <footer>
          <div>
            <div class="group-buttons">
              <div class="like">
                <button @click="eventLike(index)" :class="{ 'selected-like': n.likeClicked }">
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <span :class="{ 'press-like': n.likeClicked }">+1</span>
                <p>{{ n.qtdLikes }}</p>
              </div>
              <div class="dislike">
                <button
                  @click="eventDislike(index)"
                  :class="{ 'selected-dislike': n.dislikeClicked }"
                >
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <span :class="{ 'press-dislike': n.dislikeClicked }">+1</span>
                <p>{{ n.qtdDislikes }}</p>
              </div>
            </div>
            <div class="informations">
              <p>{{ n.autoria }}</p>
              <p>{{ n.dateFormatted }}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <LoadingMore v-if="isLoadingMore" />
    <Observer v-on:intersect="intersected" />
  </main>
  <LoadingTemplate v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../config/api';

import Observer from '../../observer/Observer.vue';
import LoadingTemplate from './loadingTemplate/LoadingTemplate.vue';
import LoadingMore from '../../loadingMore/LoadingMore.vue';

export default {
  name: 'News',
  data() {
    return {
      news: [],
      loading: false,
      loadingMore: false,
      page: 1,
      totalPages: 1,
      requested: 0,
      politicoId: null,
      updating: false,
    };
  },
  components: {
    Observer,
    LoadingTemplate,
    LoadingMore,
  },
  methods: {
    eventLike(i) {
      if (this.news[i].likeClicked) {
        this.news[i].qtdLikes -= 1;
      } else {
        this.news[i].qtdLikes += 1;
      }

      this.news[i].likeClicked = !this.news[i].likeClicked;

      if (this.news[i].dislikeClicked) {
        this.news[i].dislikeClicked = false;
        this.news[i].qtdDislikes -= 1;
      }
    },
    eventDislike(i) {
      if (this.news[i].dislikeClicked) {
        this.news[i].qtdDislikes -= 1;
      } else {
        this.news[i].qtdDislikes += 1;
      }

      this.news[i].dislikeClicked = !this.news[i].dislikeClicked;

      if (this.news[i].likeClicked) {
        this.news[i].likeClicked = false;
        this.news[i].qtdLikes -= 1;
      }
    },
    async getNews(id) {
      const { initialDate, finalDate } = this.getDateFormatted(360);

      const response = await api.get(
        `/News/${id}/${initialDate}/${finalDate}`,
        {
          params: {
            page: this.page,
          },
        },
      );

      if (this.page === 1) {
        this.totalPages = response.data.totalPages;
      }

      const data = response.data.noticias.map((news) => ({
        ...news,
        likeClicked: false,
        dislikeClicked: false,
        dateFormatted: format(
          new Date(news.dataPublicacao),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt },
        ),
        imageExists: !!news.urlImg,
      }));

      this.news = [...this.news, ...data];

      this.loading = false;
      this.loadingMore = false;
      this.requested = 0;

      if (this.updating) {
        this.updating = false;
      }
    },
    getDateFormatted(offset) {
      const date = new Date();

      const finalDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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
        if (this.page > this.totalPages) {
          return;
        }

        this.loadingMore = true;
        this.getNews(this.politicoId);
      }
    },
    resetVariables() {
      this.loading = true;
      this.loadingMore = false;

      this.page = 1;
      this.requested = 0;
      this.news = [];
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
      return true;
    },
  },
  watch: {
    politicoSelected() {
      if (!this.updating) {
        this.resetVariables();

        this.politicoId = (this.politicoSelected).id;
        this.getNews(this.politicoId);
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
      this.resetVariables();

      this.politicoId = (this.politicoSelected).id;
      this.getNews(this.politicoId);
    }
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
