import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    politicoCarrossel: {},
    exibirCarrossel: true,
  },
  mutations: {
    set_politicoCarrossel: (state, politico) => {
      state.politicoCarrossel = politico;
    },
    set_exibirCarrossel: (state, bool) => {
      state.exibirCarrossel = bool;
    },
  },
  actions: {
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
