import { fetchCategory, fetchSlides } from "@/api/home";
import * as types from '@/store/actions-type';

export default {
  namespaced: true,
  state: {
    categories: [], // 分类数据
    currentLesson: -1, // 当前用户选中的课程
    slides: [], // 轮播图
  },
  actions: {
    [types.SET_CATEGORIES]({ commit }) {
      return fetchCategory().then(data => {
        commit(types.SET_CATEGORIES, data);
      });
    },
    [types.SET_SLIDES]({ commit }) {
      return fetchSlides().then(data => {
        commit(types.SET_SLIDES, data);
      });
    },
  },
  mutations: {
    // 设置分类
    [types.SET_CATEGORIES](state, payload) {
      state.categories = payload;
    },
    [types.SET_CURRENT_LESSON](state, payload) {
      state.currentLesson = payload;
    },
    [types.SET_SLIDES](state, payload) {
      state.slides = payload;
    }
  },
};
