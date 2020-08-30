<template>
  <div
    class="container-wrap"
    :style="style"
    @mousedown.left="control"
    @mouseup.left="release"
    @mouseleave="release"
  >
    <div class="blur-layer">
      <div class="color-layer" :style="colorLayerStyle">
        <div class="noise-layer"></div>
      </div>
    </div>
    <div class="content" :style="`color:${darkMode?'white':'black'}`">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, toRef, provide, inject } from 'vue'
import { addCallBack } from '@/callbackPoll'
import { sharedState } from '../store'
import { num2color } from '@/util'
import {
  useWindowWrapStyle,
  useInitState,
  useWindowControl
} from './window'

export default defineComponent({
  name: 'window',
  props: {
    initPos: {
      default: () => ({
        top: 256,
        left: 256
      })
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const p = props
    const state = useInitState(p.initPos, p.name)
    const { style } = useWindowWrapStyle(state)
    const { move, control, release } = useWindowControl(state)
    provide('window-size', state.size)
    provide('window-offset', state.offset)
    const windowRegist = inject<(window: typeof state) => void>('window-regist')
    onMounted(() => {
      addCallBack('mousemove', move)
      if (windowRegist) {
        windowRegist(state)
      }
    })
    const colorLayerStyle = computed(() => {
      return `background: rgba(${num2color(
        sharedState.darkMode ? 0 : 0xffffff
      )}, 0.4)`
    })
    return {
      style,
      colorLayerStyle,
      release,
      control,
      darkMode: toRef(sharedState, 'darkMode')
    }
  }
})
</script>
<style lang="scss" scoped>
.container-wrap {
  user-select: none;
  position: fixed;
  background: inherit;
  overflow: hidden;
  border: 2px solid #aaa;
  .blur-layer {
    position: relative;
    top: -16px;
    left: -16px;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background: inherit;
    filter: blur(12px);
    * {
      width: 100%;
      height: 100%;
    }
    .color-layer {
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .content {
    padding: 16px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    word-break: normal;
    z-index: 3;
    box-sizing: border-box;
  }
}
</style>
