import { createApp } from 'vue'
import App from './App.vue'
import window from './components/window.vue'
import reveal from './components/reveal.vue'
import revealContainer from './components/reveal-container.vue'
import windowContainer from './components/window-container.vue'
import col from './components/col.vue'
import row from './components/row.vue'

const root = createApp(App)
const components = [
  window,
  reveal,
  revealContainer,
  windowContainer,
  col,
  row
]
components.forEach(item => {
  root.component(item.name, item)
})
root.mount('#app')
