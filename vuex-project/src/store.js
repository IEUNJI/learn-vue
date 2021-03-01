import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 18
  },
  getters: {
    myAge(state) {
      return state.age + 1;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus(store, payload) {
      setTimeout(() => {
        store.commit('syncMinus', payload);
      }, 1000);
    }
  }
})
