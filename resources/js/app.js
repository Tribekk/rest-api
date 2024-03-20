import './bootstrap';

import { createApp } from 'vue';

import app from './components/App.vue';
import router from './router/index.js';
import vuelidate from '@vuelidate/core'



createApp(app).use(router,vuelidate).mount('#app');