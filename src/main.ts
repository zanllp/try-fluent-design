import { createApp } from 'vue'
import App from './App.vue'
import window from './components/window.vue'
import block from './components/block.vue'
import blockContainer from './components/block-container.vue'
import windowContainer from './components/window-container.vue'
import col from './components/col.vue'
import row from './components/row.vue'

const root = createApp(App)
const components = [
  window,
  block,
  blockContainer,
  windowContainer,
  col,
  row
]
components.forEach(item => {
  root.component(item.name, item)
})
root.mount('#app')
