<template>
  <div
    class="container-wrap"
    :style="style"
    @mousedown.left="dragState.add('start')"
    @mouseup.left="dragState.clear()"
    @mouseleave="(!dragState.has('resize')) && dragState.clear()"
  >
    <div class="blur-layer" ref="containerRef">
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
import {
  defineComponent,
  SetupContext,
  reactive,
  ref,
  computed,
  onMounted,
  toRef
} from 'vue'
import { addCallBack } from '@/callbackPoll'
import { sharedState } from '../store'
import { num2color } from '@/util'
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
    const containerPos = reactive({ top: 0, left: 0 })
    const size = reactive({ width: 512, height: 256 })
    const backgroundPos = reactive({ top: 0, left: 0 })
    const containerRef = ref<HTMLDivElement | null>(null)
    type stateType = 'start' | 'resize'
    const dragState = reactive(new Set<stateType>())
    const stateStack = new Array<Array<stateType>>()
    const onMouseMove = (e: MouseEvent) => {
      if (dragState.has('start')) {
        if (dragState.has('resize')) {
          size.width += e.movementX
          size.height += e.movementY
        } else {
          containerPos.top += e.movementX
          containerPos.left += e.movementY
        }
      }
      if (
        containerPos.top + initPos.top + size.width - e.pageX > 0 &&
        containerPos.top + initPos.top + size.width - e.pageX < 16 &&
        containerPos.left + initPos.left + size.height - e.pageY > 0 &&
        containerPos.left + initPos.left + size.height - e.pageY < 16
      ) {
        if (!dragState.has('resize')) {
          stateStack.push(Array.from(dragState))
        }
        dragState.add('resize')
      } else {
        let lastState = stateStack.pop()
        while (lastState && lastState.includes('resize')) {
          lastState = stateStack.pop()
        }
        if (lastState) {
          dragState.clear()
          lastState.forEach((state) => dragState.add(state))
        }
      }
    }
    const style = computed(() => {
      const cursorMap: { [k in stateType]: string } = {
        start: 'move',
        resize: 'nwse-resize'
      }
      const bgPos = {
        // 2边框，16白边切除的补偿
        top: -containerPos.top - initPos.top - 2 + 16,
        left: -containerPos.left - initPos.left - 2 + 16
      }
      return `
        background-position:${bgPos.top}px ${bgPos.left}px;
        transform:translate(${containerPos.top}px,${containerPos.left}px);
        cursor:${cursorMap[Array.from(dragState.keys())[0]]};
        width:${size.width}px;
        height:${size.height}px;
        top:${initPos.top}px;
        left:${initPos.left}px;`
    })
    onMounted(() => {
      addCallBack('mousemove', onMouseMove)
    })
    const colorLayerStyle = computed(() => {
      return `background: rgba(${num2color(
        sharedState.darkMode ? 0 : 0xffffff
      )}, 0.4)`
    })
    return {
      backgroundPos,
      containerRef,
      style,
      dragState,
      colorLayerStyle,
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
  border: 2px solid white;
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
