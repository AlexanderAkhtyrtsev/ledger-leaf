import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store'
import i18n from '@/i18n';

loadFonts();

createApp(App)
    .use(router)
    .use(i18n)
    .use(store)
    .use(vuetify)
    .mount('#app')
