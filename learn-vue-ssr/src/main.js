import Vue from 'vue';
import App from './App';
import createRouter from './router';
import createStore from './store';

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render(h) {
      return h(App);
    }
  });

  return {
    app,
    router,
    store
  };
};
