<template>
  <div class="window-container" ref="selfRef" @mousemove="onMouseMove" :style="style">
    <slot></slot>
    <div class="aside-manage-bar">
      <block-container>
        <ul class="windows-list" ref="windowsListRef">
          <li v-for="window in windows" :key="window.id">
            <block>
              <div class="profile" @click="pullWindow(window)">{{window.name}}</div>
            </block>
          </li>
        </ul>
      </block-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, computed, onMounted } from 'vue'
import { windowState, incrMaxZindex } from './window'
import { getCallBackQuene } from '@/callbackPoll'

export default defineComponent({
  name: 'window-container',
  props: {
    bgUrl: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const windows = reactive(new Array<windowState>())
    const windowsListRef = ref<HTMLUListElement>()
    provide('window-regist', (window: windowState) => {
      windows.push(window)
    })
    const selfRef = ref<HTMLDivElement | null>(null)
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const style = computed(() => `background-image:url(${props.bgUrl})`)
    const blockRect = reactive({ width: 0, height: 0 })
    provide('window-size', blockRect)
    onMounted(() => {
      const updateWindowSize = () => {
        const rect = windowsListRef.value?.getBoundingClientRect()!
        if (!rect || (rect && rect.height === 0)) {
          return setTimeout(updateWindowSize, 300)
        }
        blockRect.width = rect.width + 32 // windows有padding32
        blockRect.height = rect.height + 32
      }
      updateWindowSize()
    })
    const pullWindow = (win: windowState) => {
      win.zIndex = incrMaxZindex()
    }
    return {
      window,
      selfRef,
      onMouseMove,
      style,
      windows,
      windowsListRef,
      pullWindow
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
.aside-manage-bar {
  position: fixed;
  right: 0;
  border-radius: 4px;
  height: 60vh;
  top: 20vh;
  .windows-list {
    min-width: 128px;
    list-style: none;
    padding: 0;
    margin: 0;
    .profile {
      cursor: pointer;
      padding: 8px;
    }
  }
}
</style>
