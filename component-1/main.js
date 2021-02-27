import Vue from 'vue';
import App from './App';

Vue.prototype.$bus = new Vue();

new Vue({
  el: '#app',
  render(h) {
    return h(App);
  }
});
