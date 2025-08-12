import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import zitadelAuth from './services/zitadelAuth'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import "vue-toastification/dist/index.css";

const app = createApp(App)
// app.config.errorHandler = (err, instance, info) => {
//   const error = err as Error
//   console.error('Global Error:', {
//     error: error.message,
//     stack: error.stack,
//     component: instance?.$options.name || 'Unknown',
//     context: info,
//     timestamp: new Date().toISOString(),
//   })

//   // Em produção, envie para serviço de monitoramento
//   if (import.meta.env.PROD) {
//     // Sentry.captureException(err, { extra: { component: instance, info } })
//   }
// }

const options: PluginOptions = {
    // You can set your default options here
    position: POSITION.TOP_CENTER,
};

app.use(Toast, options);

const zitadelStarted = zitadelAuth.oidcAuth.startup()
if (!zitadelStarted) {
  console.error('Zitadel Startup was not ok')
  throw new Error('Zitadel Startup was not ok')
}

app.use(createPinia())
app.use(router)
app.config.globalProperties.$zitadel = zitadelAuth
app.use(VueQueryPlugin)
app.mount('#app')
