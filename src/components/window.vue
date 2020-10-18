<template>
  <div
    class="container-wrap"
    :style="style"
    @mousedown.left="control"
    @mouseup.left="release"
    @mouseleave="release"
    :data-window-switch="state.scale !== 1"
  >
    <div class="blur-layer">
      <div class="color-layer" :style="colorLayerStyle">
        <div class="noise-layer"></div>
      </div>
    </div>
    <div class="content" :style="`color:${darkMode ? 'white' : 'black'}`">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, toRef, provide, inject, ref } from 'vue'
import { addCallBack } from '@/callbackPoll'
import { sharedState } from '../store'
import { customPropsType, num2color } from '@/util'
import {
  useWindowWrapStyle,
  useInitState,
  useWindowControl, WindowState
} from './window'
const getDefaultPos = (windows?: Array<WindowState>) => {
  const offsetCount = windows ? windows.filter(win => !win.hasInitPos).length : 0
  return ({
    top: 128 + offsetCount * 32,
    left: 128 + offsetCount * 32
  })
}

export default defineComponent({
  name: 'window',
  props: {
    initPos: customPropsType<{ top: number; left: number }>(false),
    name: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: undefined
    },
    size: {
      default: () => ({ width: 512, height: 256 })
    }
  },
  setup (props) {
    const p = props
    const windows = inject<Array<WindowState>>('windows')
    const initPos = p.initPos || getDefaultPos(windows)
    const state = useInitState(initPos, !!p.initPos, p.name, p.size)
    const { style } = useWindowWrapStyle(state)
    const { move, control, release } = useWindowControl(state)
    provide('window-size', state.size)
    provide('window-offset', state.offset)
    provide('window-state', ref(state))
    const windowRegist = inject<(window: WindowState) => void>('window-regist')
    if (windowRegist) {
      windowRegist(state)
    }
    onMounted(() => {
      addCallBack('mousemove', move)
    })
    const darkMode = ref(
      props.dark === undefined
        ? toRef(sharedState, 'darkMode')
        : props.dark
    )
    const colorLayerStyle = computed(() => {
      return `background: rgba(${num2color(
        darkMode.value ? 0 : 0xffffff
      )}, 0.4)`
    })
    return {
      style,
      colorLayerStyle,
      release,
      control,
      darkMode,
      state
    }
  }
})
</script>
<style lang="scss" scoped>
.container-wrap {
  position: absolute;
  user-select: none;
  position: fixed;
  background: inherit;
  overflow: hidden;
  border: 2px solid #aaa;
  top: 0;
  left: 0;
  &:hover[data-window-switch="true"] {
    border: 2px solid white;
    cursor: pointer;
  }
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
