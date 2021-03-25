import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function createStore() {
  const store = new Vuex.Store({
    state: {
      name: ''
    },
    mutations: {
      changeName(state) {
        state.name = 'linzijun'
      }
    },
    actions: {
      changeName({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('changeName');
            resolve();
          }, 200);
        });
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  return store;
};
