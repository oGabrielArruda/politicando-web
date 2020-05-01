import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const autentication = localStorage.getItem('autentication');

export default new Vuex.Store({
  state: {
    user: autentication ? (JSON.parse(autentication)).user : {},
    token: autentication ? (JSON.parse(autentication)).token : '',
    politicoCarrossel: {},
    exibirCarrossel: true,
  },
  mutations: {
    set_user: (state, user) => {
      state.user = user.user;
      state.token = user.token;

      // this.$store.commit('saveData');
    },
    set_politicoCarrossel: (state, politico) => {
      state.politicoCarrossel = politico;
    },
    set_exibirCarrossel: (state, bool) => {
      state.exibirCarrossel = bool;
    },
    saveData(state) {
      window.localStorage.setItem('autentication', JSON.stringify({
        user: state.user,
        token: state.token,
      }));
    },
  },
  actions: {
    changeUser({ commit }, user) {
      commit('set_user', user);
      commit('saveData');
    },
    changePoliticoCarrossel({ commit }, politico) {
      commit('set_politicoCarrossel', politico);
    },
    changeExibirCarrossel({ commit }, bool) {
      commit('set_exibirCarrossel', bool);
    },
  },
  modules: {
  },
});
