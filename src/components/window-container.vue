<template>
  <div class="window-container" ref="selfRef" @mousemove="onMouseMove" :style="style">
    <slot></slot>
    <sidebar :container-state="state"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, computed, onMounted } from 'vue'
import { WindowState } from './window'
import { getCallBackQuene } from '@/callbackPoll'
import { ContainersState, useAutoLayout } from './window-container'
import sidebar from './sidebar.vue'
import { customPropsType } from '../util'
export default defineComponent({
  name: 'window-container',
  props: {
    bgUrl: customPropsType<string>()
  },
  components: {
    sidebar
  },
  setup (props) {
    const state: ContainersState = reactive({
      windowTriggerPool: new Map<'click', WindowState[]>(),
      bodyRect: null,
      windows: new Array<WindowState>(),
      flagSet: new Set()
    })
    provide('add-trigger-window', (type: 'click', winstate: WindowState) => {
      const quene = state.windowTriggerPool.get('click')
      if (quene) {
        quene.push(winstate)
      } else {
        state.windowTriggerPool.set('click', [winstate])
      }
    })
    const ro = new ResizeObserver(body => {
      state.bodyRect = body[0].target.getBoundingClientRect()
    })
    provide('windows', state.windows)
    provide('window-regist', (window: WindowState) => {
      state.windows.push(window)
    })
    const selfRef = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      const dom = selfRef.value
      if (dom) {
        ro.observe(dom)
        document.body.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && e.target === document.body) {
            useAutoLayout(state)
          }
        })
        setTimeout(() => {
          useAutoLayout(state)
        }, 500)
      }
    })
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const style = computed(() => `background-image:url(${props.bgUrl})`)
    return {
      window,
      selfRef,
      onMouseMove,
      style,
      state
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
  position: relative;
}
</style>
