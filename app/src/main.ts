import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { analytics } from '~/plugins/firebase/analytics'
import { createHead } from '@vueuse/head'

import './assets/main.css'

const app = createApp(App)

const head = createHead()
app.use(head)

app.use(router)

app.mount('#app')
