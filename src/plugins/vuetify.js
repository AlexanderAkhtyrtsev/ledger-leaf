// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {VSnackbar} from 'vuetify/lib/components/VSnackbar';

export default createVuetify({
    theme: {
        defaultTheme: 'dark'
    },
    components: {
        VSnackbar
    }
})
