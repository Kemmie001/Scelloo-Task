import Vue from 'vue'
// import { createApp } from 'vue';
// import axios from 'axios';
import App from './App.vue'
import store from './store'
import './assets/tailwind.css'
import './assets/main.scss'

Vue.config.productionTip = false

// const app = createApp(App);
// app.config.globalProperties.$http = axios;
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
