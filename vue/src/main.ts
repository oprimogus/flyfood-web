import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import zitadelAuth from './services/zitadelAuth'

const app = createApp(App)

const zitadelStarted = await zitadelAuth.oidcAuth.startup()
if (!zitadelStarted) {
  console.error('Zitadel Startup was not ok')
  throw new Error('Zitadel Startup was not ok')
}

app.use(createPinia())
app.use(router)
app.config.globalProperties.$zitadel = zitadelAuth
app.mount('#app')
