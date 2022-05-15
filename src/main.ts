import { createApp } from 'vue'
import App from './App.vue'

// -- main
import './assets/css/rufus.css'
import './assets/css/rufus-utils.css'
import './assets/css/main.css'
import './assets/css/media.css'
// -- custom
import './assets/css/components/modals.css'
import './assets/css/components/editor__left.css'
import './assets/css/components/dropdown.css'
import './assets/css/components/buttons.css'
import './assets/css/components/debug.css'
import './assets/css/components/docs.css'

import router from './router'

createApp(App).use(router).mount('#app')
