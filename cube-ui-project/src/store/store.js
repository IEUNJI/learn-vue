import Vue from 'vue';
import Vuex from 'vuex';

import * as types from '@/store/actions-type';
import { login, validate, upload } from "@/api/user";

import home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
  },
  state: {
    ajaxToken: [],
    user: {},
    hasPermission: false,
    menuPermission: false,
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
    [types.SET_USER](state, user) {
      state.user = user;
      state.hasPermission = true;
    },
    [types.SET_MENU_LIST](state) {
      state.menuPermission = true;
    },
    [types.UPLOAD](state, url) {
      state.user = {...state.user, url};
    },
  },
  actions: {
    [types.LOGIN]({ commit }, user) {
      return login(user).then(data => {
        commit(types.SET_USER, data);
        return data;
      });
    },
    [types.VALIDATE]({ commit }) {
      return validate().then(data => {
        commit(types.SET_USER, data);
        return true;
      }).catch(e => {
        return Promise.reject(false);
      });
    },
    [types.UPLOAD]({ state, commit }, fd) {
      return upload(fd).then(data => {
        commit(types.UPLOAD, data.url);
        return data;
      });
    },
  },
});
