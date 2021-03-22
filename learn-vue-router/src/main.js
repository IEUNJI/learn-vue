import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  name: 'main',
  router,
  data() {
    return {
      name: 'main'
    };
  },
  render: h => h(App)
}).$mount('#app')
