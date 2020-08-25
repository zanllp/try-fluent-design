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
import { defineComponent, SetupContext, computed, onMounted, toRef, provide } from 'vue'
import { addCallBack } from '@/callbackPoll'
import { sharedState } from '../store'
import { num2color } from '@/util'
import {
  useWindowWrapStyle,
  useInitState,
  useWindowControl
} from './window'
import { map } from 'lodash'
type IContext = {} & SetupContext
type IProps = {
  initPos: {
    top: number;
    left: number;
  };
}
export default defineComponent({
  props: {
    initPos: {
      type: Object,
      default: () => ({
        top: 256,
        left: 256
      })
    }
  },
  setup (props) {
    const p = props as IProps
    const { initPos } = p
    const state = useInitState(initPos)
    const { style } = useWindowWrapStyle(state)
    const { move, control, release } = useWindowControl(state)
    onMounted(() => {
      addCallBack('mousemove', move)
    })
    provide('window-size', state.size)
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
