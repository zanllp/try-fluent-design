<template>
  <div class="block-container" @mousemove="control" @mouseleave="release" ref="blockContainerRef">
    <slot></slot>
    <svg
      class="svg-mask"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :viewBox="`0 0 ${Math.max(windowSize.width - 32, 0)} ${Math.max(windowSize.height - 32, 0)}`"
      ref="svgRef"
    >
      <defs>
        <radialGradient
          :id="`Gradient-${id}`"
          :cx="svgCursorPercent.x"
          :cy="svgCursorPercent.y"
          r="0.2"
        >
          <stop offset="0%" stop-color="white" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
        <mask :id="`Mask-${id}`">
          <rect
            v-for="item in layout"
            :x="item.x-1"
            :y="item.y-1"
            :width="item.width"
            :height="item.height"
            :key="item.i"
            fill="black"
            stroke="white"
            stroke-width="2"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        :width="maxSide"
        :height="maxSide"
        :fill="isStart?`url(\'#Gradient-${id}\')`:'transparent'"
        :mask="isStart?`url(\'#Mask-${id}\')`:undefined"
      />
    </svg>
  </div>
</template>
<script lang="tsx">
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  defineComponent,
  ref,
  onMounted,
  provide,
  inject,
  watch,
  computed,
  reactive,
  Ref,
  onUnmounted
} from 'vue'
import { debounce } from 'lodash'
import { addCallBack } from '@/callbackPoll'
import { Size, AnyBlockState, getIncrementId } from '@/util'
import { windowState } from './window'

const useSvg = (windowSize: Ref<Size>, windowOffset: Ref<{ top: number; left: number }>, state?: windowState) => {
  type state = {
    rect: {
      width: number;
      height: number;
    };
    value?: string;
    i: number;
  }
  const svgRef = ref<SVGElement>()
  const svgRect = ref<DOMRect>()
  // 太麻烦，暂时不用
  const svgObserver = {
    ro: new ResizeObserver(_entries => {
      svgRect.value = svgRef.value!.getBoundingClientRect()
    }),
    mounted: () => {
      const dom = svgRef.value
      if (!dom) {
        throw new Error('获取svg dom失败!!!')
      }
      svgRect.value = dom.getBoundingClientRect()
      svgObserver.ro.observe(dom)
    },
    unmounted: () => {
      svgObserver.ro.disconnect()
    }
  }
  const svgCursorPercent = ref<{ x: number | string; y: number | string }>({
    x: 0,
    y: 0
  })
  const maxSide = computed(() => Math.max(windowSize.value.height - 32, windowSize.value.width - 32, 0))
  type Flag = 'start'
  const svgStateStack = reactive(new Set<Flag>())
  const control = () => {
    svgStateStack.add('start')
  }
  const release = () => {
    svgStateStack.delete('start')
  }
  const cursorMove = (e: MouseEvent) => {
    if (state?.scale !== 1) {
      return
    }
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
  const blocks = reactive(new Array<AnyBlockState>())
  const layout = computed(() => {
    const svg = svgRef.value
    const rect = svg ? svg.getBoundingClientRect() : { x: 0, y: 0 }
    const res = blocks.filter(item => item.rect)
      .map((item) => ({
        width: item.rect!.width,
        height: item.rect!.height,
        i: item.id,
        x: item.rect!.x - rect.x,
        y: item.rect!.y - rect.y
      }))
    return res
  })
  const isStart = computed(() => {
    // 缩放时不需要等效
    if (state?.scale !== 1) {
      return false
    }
    return svgStateStack.has('start')
  })
  return {
    layout,
    svgCursorPercent,
    svgRef,
    control,
    release,
    cursorMove,
    blocks,
    isStart,
    maxSide,
    svgObserver
  }
}

const useProvider = (blocks: Array<AnyBlockState>) => {
  const idCounter = ref(0)
  type QueneType = { cb: () => void; id: number }
  const updateQuene = new Array<QueneType>()
  provide('regist-any-block', (state: AnyBlockState) => {
    state.id = ++idCounter.value
    blocks.push(state)
    return state.id
  })
  provide('update-block-state', (state: AnyBlockState) => {
    const idx = blocks.findIndex(item => item.id === state.id)
    if (idx !== -1) {
      blocks[idx] = state
    }
  })
  provide('on-will-update-rect', (cb: () => void, id: number) => {
    updateQuene.push({ cb, id })
  })
  provide('unmounted-block', (id: number) => {
    updateQuene.splice(updateQuene.findIndex(item => item.id === id), 1)
    blocks.splice(blocks.findIndex(item => item.id === id), 1)
  })
  return {
    updateQuene
  }
}

export default defineComponent({
  name: 'blockContainer',
  setup () {
    const state = inject<windowState>('window-state')
    const id = getIncrementId('block-container')
    const initOffset = { top: 0, left: 0 }
    const windowSize = ref({ width: 200, height: 200 })
    const windowOffset = ref(initOffset)
    const {
      layout,
      svgCursorPercent,
      svgRef,
      cursorMove,
      control,
      release,
      blocks,
      isStart,
      maxSide,
      svgObserver
    } = useSvg(windowSize, windowOffset, state)
    const { updateQuene } = useProvider(blocks)
    const refreshMask = debounce(() => {
      updateQuene.forEach(val => val.cb())
    }, 100)
    const blockContainerRef = ref<HTMLDivElement>()
    const ro = new ResizeObserver(refreshMask)
    onMounted(() => {
      const dom = blockContainerRef.value
      if (dom) {
        ro.observe(dom)
      }
      const size = inject<Size>('window-size')
      const offset = inject<typeof initOffset>('window-offset')
      if (!(size)) {
        throw new Error('block-container组件必须在window组件的包裹下或手动注入窗口尺寸')
      }
      windowSize.value = size
      if (offset) {
        windowOffset.value = offset
      }
      svgObserver.mounted()
      if (windowSize.value) {
        watch(() => windowSize.value, refreshMask, {
          deep: true,
          immediate: true
        })
      }
      addCallBack('mousemove', debounce(cursorMove))
    })
    onUnmounted(() => {
      svgObserver.unmounted()
      ro.disconnect()
    })
    return {
      layout,
      svgCursorPercent,
      svgRef,
      control,
      release,
      windowSize,
      isStart,
      maxSide,
      id,
      blockContainerRef
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
