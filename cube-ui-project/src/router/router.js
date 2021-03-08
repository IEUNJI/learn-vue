import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home.vue';

import loadable from '@/utils/loadable';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/course',
      name: 'course',
      component: loadable(() => import(/* webpackChunkName: "course" */ '@/views/Course/Course.vue')),
    },
    {
      path: '/profile',
      name: 'profile',
      component: loadable(() => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue')),
    },
  ],
});
