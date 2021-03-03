import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
// import setting from './store/setting';
// import player from './store/player';

createApp(App).use(router).mount('#app');
