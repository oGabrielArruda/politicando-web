<template>
  <header>
    <div class="information">
      <div class="title">
        <h2>Olá!</h2>
        <h1>Que tal supervisionar</h1>
        <h4>quem você votou?</h4>
      </div>
      <div class="list">
        <div class="item">
          <img src="../../assets/initial/propostas.png" alt="Propostas" />
          <div>
            <h3>O que está sendo proposto?</h3>
            <p>
              Veja o que seus políticos escolhidos estão fazendo.
              Propostas, discursos e votos estarão disponíveis e claros.
            </p>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/initial/estatisticas.png" alt="Estatisticas" />
          <div>
            <h3>O que as estatísticas dizem?</h3>
            <p>
              Visualize todos os dados dos políticos em tempo real.
              Tais como gastos, faltas, processos e dados do partido.
            </p>
          </div>
        </div>
        <div class="item">
          <img src="../../assets/initial/noticias.png" alt="Noticias" />
          <div>
            <h3>O que a mídia diz?</h3>
            <p>Tenha acesso a todas as notícias referentes aos políticos.</p>
          </div>
        </div>
      </div>
    </div>
    <img src="../../assets/initial/binoculos.png" />
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@mixin font-rezisable-0 {
  @media (min-width: 591px) and (max-width: 600px) and (orientation: landscape) {
    @content;
  }
}

@mixin font-resizable-1 {
  @media (min-width: 511px) and (max-width: 590px) {
    @content;
  }
}

@mixin font-resizable-2 {
  @media (min-width: 399px) and (max-width: 510px) {
    @content;
  }
}

@mixin font-resizable-3 {
  @media (min-width: 200px) and (max-width: 398px) {
    @content;
  }
}

/* other responsive */
@mixin for-phone-only {
  @media (max-width: 699px) {
    @content;
  }
}

@mixin for-phone-landscape-up {
  @media (min-width: 568px) and (max-width: 899px) and (orientation: landscape) {
    @content;
  }
}

@mixin for-tablet-portrait-up {
  @media (min-width: 700px) and (max-width: 899px) and (orientation: portrait) {
    @content;
  }
}

@mixin for-tablet-landscape-up {
  @media (min-width: 900px) and (max-width: 1199px) {
    @content;
  }
}

@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}

@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}

header {
  display: flex;

  @include for-desktop-up {
    height: 90vh;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  @include for-tablet-landscape-up {
    height: 90vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @include for-tablet-portrait-up {
    height: 90vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  @include for-phone-only {
    height: 80vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @include font-resizable-2 {
    height: 75vh;
  }

  @include for-phone-landscape-up {
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & > img {
    width: 26%;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.07);
    }
    &:active {
      transform: scale(0.97);
    }

    @include for-tablet-landscape-up {
      display: none;
    }

    @include for-tablet-portrait-up {
      display: none;
    }

    @include for-phone-only {
      width: 45%;
    }
    @include for-phone-landscape-up {
      display: none;
    }
  }

  .information {
    display: flex;
    flex-direction: column;

    @include for-desktop-up {
      align-items: flex-start;
    }

    @include for-tablet-landscape-up {
      align-items: center;
    }

    @include for-tablet-portrait-up {
      align-items: center;
    }

    @include for-phone-only {
      align-items: center;
    }
    @include for-phone-landscape-up {
      align-items: center;
    }

    .title {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      @include for-phone-only {
        align-items: center;
        margin-bottom: 0;
      }
      @include for-phone-landscape-up {
        align-items: center;
        margin-bottom: 0;
      }

      h2 {
        font-weight: bold;
        color: #3e3f4b;
        font-size: 50px;

        @include font-resizable-1 {
          font-size: 40px;
        }

        @include font-resizable-2 {
          font-size: 30px;
        }

        @include font-resizable-3 {
          font-size: 20px;
        }
      }

      h1 {
        font-weight: bold;
        color: #444552;
        font-size: 60px;

        @include font-resizable-1 {
          font-size: 50px;
        }

        @include font-resizable-2 {
          font-size: 40px;
        }

        @include font-resizable-3 {
          font-size: 30px;
        }
      }

      h4 {
        font-weight: bold;
        color: rgb(255, 255, 255);
        font-size: 40px;

        @include font-resizable-1 {
          font-size: 30px;
        }

        @include font-resizable-2 {
          font-size: 20px;
        }

        @include font-resizable-3 {
          font-size: 10px;
        }
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      width: 75%;

      @include for-phone-only {
        display: none;
      }
      @include for-phone-landscape-up {
        display: none;
      }

      .item {
        display: flex;
        flex-direction: row;
        margin-top: 15px;

        & > div {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          & > h3 {
            color: #3e3f4b;
            font-weight: bold;
            margin-bottom: 3px;
          }

          & > p {
            color: rgb(255, 255, 255);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
