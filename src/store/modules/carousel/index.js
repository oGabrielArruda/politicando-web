export default {
  namespaced: true,
  state: {
    selected: null,
    selects: [],
  },
  getters: {
    politicoSelected(state) {
      return state.selected;
    },
    politicosSelects(state) {
      return state.selects;
    },
  },
  mutations: {
    SET_SELECTED(state, payload) {
      state.selected = payload;
    },
    SET_SELECTS(state, payload) {
      state.selects = payload;
    },
  },
  actions: {
    changeSelected({ commit }, payload) {
      commit('SET_SELECTED', payload);
    },
    changeSelects({ commit }, payload) {
      commit('SET_SELECTS', payload);
    },
  },
};
