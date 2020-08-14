<template>
  <div
    class="container-wrap"
    :style="style"
    @mousedown.left="dragState.add('start')"
    @mouseup.left="dragState.clear()"
    @mouseleave="(!dragState.has('resize')) && dragState.clear()"
  >
    <div ref="containerRef" class="blur-layer">
      <div class="color-layer" :style="colorLayerStyle">
        <div class="noise-layer" :style="colorLayerStyle"></div>
      </div>
    </div>
    <div class="content" :style="`color:${darkMode?'white':'black'}`">
      {{info}}
      <span>暗黑模式</span>
      <input type="checkbox" v-model="darkMode" />
      <h1>Create a responsive layout</h1>
      <p>
        For an app to feel natural, it should adapt its layout to different screen sizes and devices.
        You can use automatic sizing, layout panels, visual states, and even separate UI definitions
        in XAML to create a responsive UI.
      </p>
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
  onMounted
} from 'vue'
import { addCallBack } from '@/callbackPoll'
type IContext = {} & SetupContext

export const num2color = (c: number) => {
  const r = c >> 16
  const g = (c >> 8) & 0xff
  const b = c & 0xff
  return [r, g, b]
}

export default defineComponent({
  props: {
    config: {
      type: Object
    }
  },
  setup (_, _ctx) {
    const ctx = _ctx as IContext
    const containerPos = reactive({ top: 0, left: 0 })
    const size = reactive({ width: 512, height: 256 })
    const backgroundPos = reactive({ top: 0, left: 0 })
    const containerRef = ref<HTMLDivElement | null>(null)
    const darkMode = ref(false)
    type stateType = 'start' | 'resize'
    const color = ref(num2color(0x1890ff))
    const dragState = reactive(new Set<stateType>())
    const info = ref('')
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
      // 256是窗口的起始位置
      if (
        containerPos.top + 256 + size.width - e.pageX > 0 &&
        containerPos.top + 256 + size.width - e.pageX < 16 &&
        containerPos.left + 256 + size.height - e.pageY > 0 &&
        containerPos.left + 256 + size.height - e.pageY < 16
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
      return `
        background-position:${-containerPos.top - 256 - 2 + 16}px ${
        -containerPos.left - 256 - 2 + 16 // 256起始位置，2边框，16白边切除的补偿
      }px;
        transform:translate(${containerPos.top}px,${containerPos.left}px);
        cursor:${cursorMap[Array.from(dragState.keys())[0]]};
        width:${size.width}px;
        height:${size.height}px`
    })
    const colorLayerStyle = computed(() => {
      return `background: rgba(${num2color(
        darkMode.value ? 0 : 0xffffff
      )}, 0.4)`
    })
    onMounted(() => {
      addCallBack('mousemove', onMouseMove)
    })
    return {
      backgroundPos,
      containerRef,
      info,
      style,
      dragState,
      colorLayerStyle,
      darkMode
    }
  }
})
</script>
<style lang="scss" scoped>
.container-wrap {
  user-select: none;
  position: fixed;
  top: 256px;
  left: 256px;
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
