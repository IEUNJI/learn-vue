import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function persits(store) {
  console.log(this);
  store.subscribe(function (mutation, state) {
    console.log(this, mutation, state);
    sessionStorage.setItem('vuex-state', JSON.stringify(state))
  });
};

// state会保持树结构，计算属性则都定义在根的getters对象上
// mutations定义在根_mutations以数组的方式存储，actions同mutations
export default new Vuex.Store({
  plugins: [
    persits
  ],
  modules: {
    a: {
      state: {
        a: 'a'
      },
      modules: {
        c: {
          state: {
            c: 'c'
          },
          mutations: {
            syncAdd(state, payload) {
              console.log(state, payload);
            }
          },
          getters: {
            computedC(state) {
              return state.c + 'ba';
            }
          }
        }
      }
    },
    b: {
      state: {
        b: 'b'
      }
    }
  },
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
      console.log('actions', this);
      setTimeout(() => {
        store.commit('syncMinus', payload);
      }, 1000);
    }
  }
})
