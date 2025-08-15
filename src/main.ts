import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import router from './router'

console.log('main.ts: Starting application')
console.log('main.ts: Router:', router)

const app = createApp(App)
console.log('main.ts: App created')

app.use(router)
console.log('main.ts: Router installed')

app.mount('#app')
console.log('main.ts: App mounted')
