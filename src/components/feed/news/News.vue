<template>
  <main v-if="isLoading">
    <div class="news-item" v-for="(n, index) in news" :key="n.idNoticia" v-bind="n">
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
  </main>
  <main v-else style="overflow: hidden;">
    <div class="loading-news">
      <div class="image"></div>
      <div class="content">
        <div class="texts">
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="footer">
          <div class="icons">
            <div>
              <i class="fas fa-thumbs-up"></i>
              <div class="line"></div>
            </div>
            <div>
              <i class="fas fa-thumbs-down"></i>
              <div class="line"></div>
            </div>
          </div>
          <div class="infos">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-news">
      <div class="image"></div>
      <div class="content">
        <div class="texts">
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="footer">
          <div class="icons">
            <div>
              <i class="fas fa-thumbs-up"></i>
              <div class="line"></div>
            </div>
            <div>
              <i class="fas fa-thumbs-down"></i>
              <div class="line"></div>
            </div>
          </div>
          <div class="infos">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-news">
      <div class="image"></div>
      <div class="content">
        <div class="texts">
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="title-line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="footer">
          <div class="icons">
            <div>
              <i class="fas fa-thumbs-up"></i>
              <div class="line"></div>
            </div>
            <div>
              <i class="fas fa-thumbs-down"></i>
              <div class="line"></div>
            </div>
          </div>
          <div class="infos">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../../config/api';

export default {
  name: 'News',
  data() {
    return {
      news: [],
      loading: false,
    };
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
    async getNews({ id }) {
      const { initialDate, finalDate } = this.getDateFormatted();

      const response = await api.get(`/News/${id}/${initialDate}/${finalDate}`);

      const data = response.data.map((news) => ({
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

      this.news = data;
      this.loading = false;
    },
    getDateFormatted() {
      const date = new Date();

      const finalMonth = date.getMonth() + 1;
      const finalDate = `${date.getFullYear()}-${
        finalMonth < 10 ? `0${finalMonth}` : finalMonth
      }-${date.getDate()}`;

      date.setDate(date.getDate() - 30);
      const initialMonth = date.getMonth() + 1;
      const initialDate = `${date.getFullYear()}-${
        initialMonth < 10 ? `0${initialMonth}` : initialMonth
      }-${date.getDate()}`;

      return {
        initialDate,
        finalDate,
      };
    },
  },
  computed: {
    politicoEscolhido() {
      return this.$store.state.politicoCarrossel;
    },
    isLoading() {
      return !this.loading;
    },
  },
  watch: {
    politicoEscolhido() {
      this.loading = true;
      this.getNews(this.politicoEscolhido);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
