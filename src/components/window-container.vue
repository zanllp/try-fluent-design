<template>
  <div class="window-container" ref="selfRef" @mousemove="onMouseMove" :style="style">
    <slot></slot>
    <sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, computed } from 'vue'
import { windowState } from './window'
import { getCallBackQuene } from '@/callbackPoll'
import sidebar from './sidebar.vue'

export default defineComponent({
  name: 'window-container',
  props: {
    bgUrl: {
      type: String,
      required: true
    }
  },
  components: {
    sidebar
  },
  setup (props) {
    const windows = reactive(new Array<windowState>())
    provide('windows', windows)
    provide('window-regist', (window: windowState) => {
      windows.push(window)
    })
    const selfRef = ref<HTMLDivElement | null>(null)
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const style = computed(() => `background-image:url(${props.bgUrl})`)
    return {
      window,
      selfRef,
      onMouseMove,
      style
    }
  }
})
</script>
<style lang="scss" scoped>
.window-container {
  background-size: 100vw;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 128px;
  box-sizing: border-box;
}
</style>
