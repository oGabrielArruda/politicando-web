import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    politicoCarrossel: {},
    exibirCarrossel: true,
  },
  mutations: {
    set_user: (state, user) => {
      state.user = user.user;
      state.tokem = user.token;
    },
    set_politicoCarrossel: (state, politico) => {
      state.politicoCarrossel = politico;
    },
    set_exibirCarrossel: (state, bool) => {
      state.exibirCarrossel = bool;
    },
  },
  actions: {
    changeUser({ commit }, user) {
      commit('set_user', user);
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
