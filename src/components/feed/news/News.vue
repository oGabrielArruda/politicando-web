<template>
  <main v-if="isLoading">
    <div class="news-item" v-for="(n, index) in news" :key="n.id" v-bind="n">
      <img :src="n.urlImg" v-if="n.imageExists" @error="replaceByDefault(index)"
      @click="clickNotice(n.url)" />
      <div class="news-content">
        <header>
          <p class="title">{{ n.titulo }}</p>
          <p class="description">{{ n.descricao }}</p>
        </header>
        <footer>
          <div>
            <div class="group-buttons">
              <div class="like">
                <button @click="eventLike(index)" :class="{ 'selected-like': n.liked }">
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <span :class="{ 'press-like': n.liked }">+1</span>
                <p>{{ n.qtdLikes }}</p>
              </div>
              <div class="dislike">
                <button
                  @click="eventDislike(index)"
                  :class="{ 'selected-dislike': n.disliked }"
                >
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <span :class="{ 'press-dislike': n.disliked }">+1</span>
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
import { mapGetters, mapActions } from 'vuex';
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
      loadingInteraction: false,
    };
  },
  props: ['filtroNome', 'size', 'showBorder'],
  components: {
    Observer,
    LoadingTemplate,
    LoadingMore,
  },
  methods: {
    ...mapActions({
      changeSelectedNav: 'navigation/changeSelectedNav',
    }),
    async eventLike(i) {
      if (this.loadingInteraction === true) { return; }
      this.loadingInteraction = true;

      const notice = this.news[i];

      if (notice.disliked) {
        notice.disliked = false;
        notice.liked = true;
        await this.removeInteraction(notice);
        await this.interaction(notice, 'LIKE');
        notice.qtdDislikes -= 1;
        notice.qtdLikes += 1;
        this.loadingInteraction = false;
        return;
      }

      if (notice.liked) {
        await this.removeInteraction(notice);
        notice.qtdLikes -= 1;
      } else {
        await this.interaction(notice, 'LIKE');
        notice.qtdLikes += 1;
      }
      notice.liked = !notice.liked;

      this.loadingInteraction = false;
    },
    async eventDislike(i) {
      if (this.loadingInteraction === true) { return; }
      this.loadingInteraction = true;

      const notice = this.news[i];

      if (notice.liked) {
        notice.liked = false;
        notice.disliked = true;
        await this.removeInteraction(notice);
        await this.interaction(notice, 'DISLIKE');
        notice.qtdLikes -= 1;
        notice.qtdDislikes += 1;
        this.loadingInteraction = false;
        return;
      }
      if (notice.disliked) {
        await this.removeInteraction(notice);
        notice.qtdDislikes -= 1;
      } else {
        await this.interaction(notice, 'DISLIKE');
        notice.qtdDislikes += 1;
      }
      notice.disliked = !notice.disliked;

      this.loadingInteraction = false;
    },
    async getNews(id) {
      const { initialDate, finalDate } = this.getDateInterval(360);

      const response = await api.get(
        `/News/${id}/${this.userState.id}/${initialDate}/${finalDate}`,
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
        dateFormatted: format(
          new Date(news.dataPublicacao),
          "d 'de' MMMM 'de' yyyy",
          { locale: pt },
        ),
        imageExists: !!news.urlImg,
      }));

      this.news = [...this.news, ...data];
      console.log(this.news);
      this.loading = false;
      this.loadingMore = false;
      this.requested = 0;

      if (this.updating) {
        this.updating = false;
      }
    },
    getDateInterval(offset) {
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
    replaceByDefault(i) {
      this.news[i].imageExists = false;
    },
    clickNotice(url) {
      window.open(url, '_blank');
    },
    createObjInteraction(notice, valueInteraction) {
      return {
        idUsuario: this.userState.id,
        idNoticia: notice.idNoticia,
        valor: valueInteraction,
      };
    },
    async interaction(notice, value) {
      try {
        await api.post('/News/interaction', this.createObjInteraction(notice, value));
      } catch (erro) {
        console.log(`Erro na interaction: ${erro}`);
      }
    },
    async removeInteraction(notice) {
      try {
        await api.post('/News/removeInteraction', this.createObjInteraction(notice));
      } catch (erro) {
        console.log(`Erro no remove interaction: ${erro}`);
      }
    },
  },
  computed: {
    ...mapGetters({
      politicoSelected: 'carousel/politicoSelected',
      userState: 'auth/user',
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

        this.politicoId = (this.politicoSelected).id;
        this.getNews(this.politicoId);
      }
    },
  },
  beforeMount() {
    this.changeSelectedNav(0);
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
