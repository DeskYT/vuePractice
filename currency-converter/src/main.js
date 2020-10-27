import {createApp} from "vue"
import App from './App.vue'
import router from './router'
import store from './store'
const vueApp = createApp(App, router).use(store);
vueApp.use(router).mount('#app')
