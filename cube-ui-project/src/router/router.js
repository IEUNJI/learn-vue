import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home.vue';

import loadable from '@/utils/loadable';

import hooks from './hooks';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        idx: 0
      }
    },
    {
      path: '/course',
      name: 'course',
      meta: {
        idx: 1
      },
      component: loadable(() => import(/* webpackChunkName: "course" */ '@/views/Course/Course.vue')),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        idx: 2
      },
      component: loadable(() => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue')),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        idx: 3
      },
      component: loadable(() => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')),
    },
  ],
});

for (const key in hooks) {
  router.beforeEach(hooks[key]);
}

export default router;
