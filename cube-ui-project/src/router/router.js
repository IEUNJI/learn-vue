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
        idx: 0,
        keepAlive: true,
      }
    },
    {
      path: '/course',
      name: 'course',
      meta: {
        idx: 1,
        keepAlive: true,
        needLogin: true,
      },
      component: loadable(() => import(/* webpackChunkName: "course" */ '@/views/Course/Course.vue')),
      children: [
        {
          path: '/course/1',
          name: 'course1',
          meta: {
            idx: 11,
          },
          component: loadable(() => import(/* webpackChunkName: "course" */ '@/views/Course/Course.vue')),
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        idx: 2,
        keepAlive: true,
      },
      component: loadable(() => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue')),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        idx: 3,
        hideFooter: true,
      },
      component: loadable(() => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')),
    },
    {
      path: "*",
      meta: {
        idx: 6
      },
      component: {
        render(h) {
          return <h2>未找到页面</h2>
        }
      },
    },
  ],
});

for (const key in hooks) {
  router.beforeEach(hooks[key].bind(router));
}

export default router;
