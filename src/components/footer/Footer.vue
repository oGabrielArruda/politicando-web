<template>
  <div class="container">
    <div class="division"></div>
    <div class="content">
      <img src="../../assets/initial/logo.png" />
      <div class="informations">
        <div class="texts">
          <h2>Links Rápidos</h2>
          <div>
            <p>
              <a href>Sobre nós</a>
            </p>
            <p>
              <a href>Nossa Logo</a>
            </p>
            <p>
              <a href>Contato</a>
            </p>
          </div>
        </div>

        <div class="texts">
          <h2>Desenvolvedores</h2>
          <div>
            <p>
              <a href="https://github.com/oGabrielArruda">Gabriel Arruda</a>
            </p>
            <p>
              <a href="https://github.com/Nouani">Nouani Sanches</a>
            </p>
            <p>
              <a href="https://github.com/GuilhermeAugustoFT">Guilherme Teixeira</a>
            </p>
          </div>
        </div>

        <div class="texts">
          <h2>Redes Sociais</h2>
          <div>
            <p>
              <a href>Facebook</a>
            </p>
            <p>
              <a href>Twitter</a>
            </p>
            <p>
              <a href>Instagram</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@mixin footer-mobile-low {
  @media (max-width: 590px) {
    @content;
  }
}

@mixin footer-mobile-medium {
  @media (min-width: 590px) and (max-width: 899px) {
    @content;
  }
}

@mixin footer-computer {
  @media (min-width: 900px) {
    @content;
  }
}

.container {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 80px;

  .division {
    height: 1px;
    background: rgb(206, 206, 206);
    width: 80vw;
    border-radius: 4px;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 35px;

    @include footer-computer {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }

    @include footer-mobile-medium {
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    @include footer-mobile-low {
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    & > img {
      height: 90px;
    }

    .informations {
      display: flex;

      @include footer-computer {
        flex-direction: row;
        justify-content: space-evenly;
        width: 60vw;
      }

      @include footer-mobile-medium {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
        width: 80vw;
      }

      @include footer-mobile-low {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
      }

      .texts {
        @include footer-mobile-low {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }

        h2 {
          font-weight: bold;
          color: rgb(46, 46, 46);
        }

        div {
          @include footer-mobile-low {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          p {
            a {
              color: rgb(173, 173, 173);
              transition: color 0.2s;
              &:link {
                color: rgb(173, 173, 173);
              }

              &:visited {
                color: rgb(173, 173, 173);
              }

              &:hover {
                color: rgb(83, 83, 83);
              }
            }
          }
        }
      }

      p {
        margin-top: 20px;
        font-size: 13pt;
      }
    }
  }
}
</style>
