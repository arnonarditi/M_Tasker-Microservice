import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import { icon } from './directives'

import './assets/main.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.directive('icon', icon)
app.mount('#app')
