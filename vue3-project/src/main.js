import { createApp } from 'vue';

import App from './App.vue';

console.log('App', App);

const app = createApp(App);

console.log('app', app);

const vm = app.mount('#app');

console.log('vm', vm);
