import api from '../../../config/api';

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async signIn({ dispatch }, payload) {
      const response = await api.post('/Users/login', payload);

      return dispatch('attempt', response.data.token);
    },

    async attempt({ commit, state }, payload) {
      if (payload) {
        commit('SET_TOKEN', payload);
      }

      if (!state.token) {
        return;
      }

      try {
        const response = await api.get('/Users/loadSession');

        commit('SET_USER', response.data.user);
      } catch (err) {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
      }
    },
    signOut({ commit }) {
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    },
  },
};
