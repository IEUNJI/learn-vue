import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex);

function persits(store) {
  console.log(this, arguments);
  store.subscribe(function (mutation, state) {
    console.log('订阅', this, arguments);
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
              console.log('模块 mutations', this, arguments);
              console.log(state, payload);
            }
          },
          getters: {
            computedC(state, getters, rootState) {
              console.log('模块getters参数', this, arguments);
              return state.c + 'ba';
            }
          },
          actions: {
            asyncMinus(store, payload) {
              console.log('模块actions', this, arguments);
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
    myAge(state, getters) {
      console.log('根getters参数', this, arguments);
      return state.age + 1;
    }
  },
  mutations: {
    syncAdd(state, payload) {
      console.log('根 mutations', this, arguments);
      state.age += payload;
    },
    syncMinus(state, payload) {
      state.age -= payload;
    }
  },
  actions: {
    asyncMinus(store, payload) {
      console.log('根actions', this, arguments);
      setTimeout(() => {
        store.commit('syncMinus', payload);
      }, 1000);
    }
  }
})
