<template>
  <div class="block-container" @mousemove="control" @mouseleave="release">
    <slot></slot>
    <svg
      class="svg-mask"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :viewBox="`0 0 ${windowSize.width - 32} ${windowSize.height - 32}`"
      ref="svgRef"
    >
      <defs>
        <radialGradient id="Gradient" :cx="svgCursorPercent.x" :cy="svgCursorPercent.y" r="0.2">
          <stop offset="0%" stop-color="white" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
        <mask id="Mask">
          <template v-for="item in layout">
            <rect
              :x="item.rect.x - 1"
              :y="item.rect.y - 1"
              :width="item.rect.width+2"
              :height="item.rect.height+2"
              :key="item.i"
              fill="black"
              stroke="white"
              stroke-width="2"
            />
          </template>
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        :width="maxSide"
        :height="maxSide"
        :fill="isStart?'url(\'#Gradient\')':'transparent'"
        :mask="isStart?'url(\'#Mask\')':undefined"
      />
    </svg>
  </div>
</template>
<script lang="tsx">
import {
  defineComponent,
  ref,
  onMounted,
  provide,
  inject,
  watch,
  computed,
  reactive,
  Ref
} from 'vue'
import { debounce } from 'lodash'
import { addCallBack } from '@/callbackPoll'
import { Size, AnyBlockState } from '@/util'

const useSvg = (windowSize: Ref<Size>) => {
  type state = {
    rect: {
      width: number;
      height: number;
    };
    value?: string;
    i: number;
  }
  const svgRef = ref<SVGElement>()
  const svgCursorPercent = ref<{ x: number | string; y: number | string }>({
    x: 0,
    y: 0
  })
  const maxSide = computed(() => Math.max(windowSize.value.height - 32, windowSize.value.width - 32))
  type Flag = 'start'
  const svgStateStack = reactive(new Set<Flag>())
  const control = () => {
    svgStateStack.add('start')
  }
  const release = () => {
    svgStateStack.delete('start')
  }
  const cursorMove = (e: MouseEvent) => {
    const svg = svgRef.value
    if (svgStateStack.has('start') && svg) {
      const rect = svg.getBoundingClientRect()
      const x = e.x - rect.x
      const y = e.y - rect.y
      svgCursorPercent.value = {
        x: x / maxSide.value,
        y: y / maxSide.value
      }
    }
  }
  const blocks = reactive<AnyBlockState[]>(new Array<AnyBlockState>())
  const layout = computed(() => {
    const svg = svgRef.value
    const rect = svg ? svg.getBoundingClientRect() : { x: 0, y: 0 }
    return blocks.filter(item => item.rect).map((item, i) => ({ ...item, i, x: item.rect!.x - rect.x, y: item.rect!.y - rect.y }))
  })
  const isStart = computed(() => svgStateStack.has('start'))
  return {
    layout,
    svgCursorPercent,
    svgRef,
    control,
    release,
    cursorMove,
    blocks,
    isStart,
    maxSide
  }
}
export default defineComponent({
  setup () {
    const initSize: Size = { width: 200, height: 200 }
    const windowSize = ref(initSize)
    const {
      layout,
      svgCursorPercent,
      svgRef,
      cursorMove,
      control,
      release,
      blocks,
      isStart,
      maxSide
    } = useSvg(windowSize)
    provide('regist-any-block', (state: AnyBlockState) => blocks.push(state as any))
    onMounted(() => {
      windowSize.value = inject('window-size', initSize)
      addCallBack('mousemove', cursorMove)
    })
    return {
      layout,
      svgCursorPercent,
      svgRef,
      control,
      release,
      windowSize,
      isStart,
      maxSide
    }
  }
})
</script>

<style lang="scss" scoped>
.block-container {
  position: relative;
  .svg-mask {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
