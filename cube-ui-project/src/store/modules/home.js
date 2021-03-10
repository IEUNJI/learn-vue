import { fetchCategory } from "@/api/home";
import * as types from '@/store/actions-type';

export default {
  namespaced: true,
  state: {
    categories: []
  },
  actions: {
    [types.SET_CATEGORIES]({ commit }) {
      return fetchCategory().then(data => {
        console.log('数据', data);
        commit(types.SET_CATEGORIES, data);
      }).catch(err => {
        console.log('err msg', err);
      });
    }
  },
  mutations: {
    [types.SET_CATEGORIES](state, payload) {
      state.categories = payload;
    }
  },
};
