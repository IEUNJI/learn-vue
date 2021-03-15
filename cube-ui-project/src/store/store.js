import Vue from 'vue';
import Vuex from 'vuex';

import * as types from '@/store/actions-type';
import { login } from "@/api/user";

import home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
  },
  state: {
    ajaxToken: [],
    user: {},
  },
  mutations: {
    [types.PUSH_TOKEN](state, cancel) {
      state.ajaxToken = [...state.ajaxToken, cancel];
    },
    [types.CLEAR_TOKEN](state) {
      state.ajaxToken.forEach(cancel => {
        cancel();
      });
      state.ajaxToken = [];
    },
    [types.LOGIN](state, user) {
      console.log('user', user);
      state.user = user;
    },
  },
  actions: {
    [types.LOGIN]({ commit }, user) {
      return login(user).then(data => {
        commit(types.LOGIN, data);
        return data;
      });
    }
  },
});
