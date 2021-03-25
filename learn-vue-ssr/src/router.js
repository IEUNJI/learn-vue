import Vue from 'vue';
import VueRouter from 'vue-router';

import Foo from './components/Foo';

Vue.use(VueRouter);

export default function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Foo
      },
      {
        path: '/bar',
        component: () => import(/* webpackChunkName: "bar" */ './components/Bar')
      },
    ]
  });

  return router;
};
