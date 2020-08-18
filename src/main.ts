import { createApp } from 'vue'
import App from './App.vue'
import window from './components/window.vue'

const root = createApp(App)
const components = {
  window
}
Object.entries(components).forEach(([k, v]) => {
  root.component(k, v)
})

root.mount('#app')
