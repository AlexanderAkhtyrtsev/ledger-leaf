import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from './store'
import {version} from '../package.json'

loadFonts();

createApp(App)
    .mixin({
        data() {
            return {
                version: version
            }
        }

    })
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app')
