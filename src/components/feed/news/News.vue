<template>
  <main>
    <div class="news-item">
      <img src="http://images.impresa.pt/expresso/2020-03-24-expressomeianoite2.jpg/fb/wm" />
      <div class="news-content">
        <header>
          <p class="title">
            Expresso da Meia Noite sobre o impacto da Covid-19:
            Qual é a relação custo-benefício da quarentena?
          </p>
          <p class="description">
            Não há modelos económicos para este problema.
            Vai ser possível continuar a pagar salários se as empresas estiverem
            fechadas e não houver procura? O pequeno empresário vai endividar-se
            para não despedir? As medidas de apoio às empresas
            são suficientes?
          </p>
        </header>
        <footer>
          <div>
            <div class="group-buttons">
              <div class="like">
                <button @click="eventLike()" :class="{ 'selected-like': likeClicked }">
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <span :class="{ 'press-like': likeClicked }">+1</span>
                <p>1 mil</p>
              </div>
              <div class="dislike">
                <button @click="eventDislike()" :class="{ 'selected-dislike': dislikeClicked }">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <span :class="{ 'press-dislike': dislikeClicked }">+1</span>
                <p>120</p>
              </div>
            </div>
            <div class="informations">
              <p>Expresso.pt</p>
              <p>24 de novembro de 2020</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div class="news-item">
      <img src="https://i0.statig.com.br/bancodeimagens/01/gp/6p/01gp6pfvdgil03v46nfvx47rd.jpg" />
      <div class="news-content">
        <header>
          <p class="title">PGR denuncia deputado Paulinho da Força por propina da Odebrecht</p>
          <p class="description">
            A Procuradoria-Geral da República (PGR) denunciou o deputado Paulinho
            da Força (SD-SP) por corrupção ao receber R$ 1,8 milhão propina da
            Oderbrecht.
          </p>
        </header>
        <footer>
          <div>
            <div class="group-buttons">
              <div class="like">
                <button>
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <p>735</p>
              </div>
              <div class="dislike">
                <button>
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <p>27</p>
              </div>
            </div>
            <div class="informations">
              <p>Ig.com.br</p>
              <p>06 de abril de 2020</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div class="news-item">
      <img
        src="https://www.diariodocentrodomundo.com.br/wp-content/uploads/2020/03/image_processing20200313-5121-gcoq4g.jpg"
      />
      <div class="news-content">
        <header>
          <p class="title">
            Marielle, Bolsonaro e a milícia: os fatos que escancaram o
            submundo do presidente. Por Igor Carvalho
          </p>
          <p class="description">
            Publicado no Brasil de Fato: Por Igor Carvalho Neste sábado (14),
            a execução da vereadora Marielle Franco (PSOL) e de seu motorista,
            Anderson Gomes, completa dois anos. Neste período, a apuração do crime
            avançou em alguns aspectos, mesmo que lentamente. No ma…
          </p>
        </header>
        <footer>
          <div>
            <div class="group-buttons">
              <div class="like">
                <button>
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <p>984</p>
              </div>
              <div class="dislike">
                <button>
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <p>3 mil</p>
              </div>
            </div>
            <div class="informations">
              <p>Diariodocentrodomundo.com.br</p>
              <p>14 de março de 2020</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      likeClicked: false,
      dislikeClicked: false,
    };
  },
  methods: {
    eventLike() {
      this.likeClicked = !this.likeClicked;
      this.dislikeClicked = false;
    },
    eventDislike() {
      this.dislikeClicked = !this.dislikeClicked;
      this.likeClicked = false;
    },
  },
  created() {
    console.log(this.title);
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
