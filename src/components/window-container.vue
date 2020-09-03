<template>
  <div class="window-container" ref="selfRef" @mousemove="onMouseMove" :style="style">
    <slot></slot>
    <sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, computed, Ref, onMounted } from 'vue'
import { windowState } from './window'
import { getCallBackQuene } from '@/callbackPoll'
import sidebar from './sidebar.vue'
import { resetArray } from '@/util'

const useAutoLayout = (_windows: windowState[], bodyRect: Ref<DOMRect | undefined>) => {
  const body = bodyRect.value
  const margin = 16
  const gutter = 16
  if (!body) {
    return
  }
  type Layout = { bind: windowState; scale: number; x: number; y: number }
  const res = new Array<Layout>()
  const availableWidth = body.width - margin * 2
  const availableHeight = body.height - margin * 2
  type BaseLine = { y: number; width: number }
  const BaseLines: BaseLine[] = [{ y: 0, width: availableWidth }]
  let windows = [..._windows]
  let scale = 1
  const insertBaseLine = (base: BaseLine, start: number) => {
    const end = start + base.width
    let startBase: BaseLine|undefined // 插入后的受影响范围
    let endBase: BaseLine|undefined
    const getStartPos = (index: number) => BaseLines.slice(0, index - 1).reduce((p, c) => p + c.width, 0)
    for (let index = 0; index < BaseLines.length; index++) {
      const curr = BaseLines[index]
      const currBaseLineStartPos = getStartPos(index) // 前面所有基线加起来的宽度
      if (currBaseLineStartPos <= start && start <= currBaseLineStartPos + curr.width) {
        startBase = curr
      }
      if (currBaseLineStartPos <= end && end <= currBaseLineStartPos + curr.width) {
        endBase = curr
      }
      if (startBase && endBase) {
        break
      }
    }
    if (!startBase || !endBase) {
      throw new Error('找不到startBase或endBase')
    }
    const startIdx = BaseLines.indexOf(startBase)
    const endIdx = BaseLines.indexOf(endBase)
    const newStart: BaseLine = {
      y: startBase.y,
      width: start - getStartPos(startIdx)
    }
    const newEnd: BaseLine = {
      y: endBase.y,
      width: getStartPos(endIdx) + endBase.width - (getStartPos(startIdx) + newStart.width + base.width)
    }
    BaseLines.splice(startIdx, endIdx - startIdx, newStart, base, newEnd)
  }
  const alloc = (curr: windowState) => {
    const x = 0
    const y = 0
    const { size } = curr
    if (BaseLines.length !== 1) {
      const needWidth = size.width
      const availableArea = new Array<BaseLine>()
      const scan = (base: BaseLine, ...seq: BaseLine[]): null | BaseLine[] => {
        const idx = BaseLines.indexOf(base)
        if (
          seq[0].y < base.y ||// 碰到到个比最右边高的放弃
          idx === -1 || // 找不到或者是移到最右侧
          idx === BaseLines.length - 1
        ) {
          return null
        }
        const reduceWidth = [...seq, base].reduce((p, c) => p + c.width, 0)
        if (reduceWidth >= needWidth) { // 得到一组解决方案
          return [...seq, base]
        }
        return scan(BaseLines[idx + 1], ...seq, base) // 继续向右找
      }
      for (const base of BaseLines) {
        const res = scan(base, base)
        if (res) { // 将求得的解合并
          availableArea.push({
            width: res.reduce((p, c) => c.width + p, 0) * scale,
            y: Math.max(...res.map(x => x.y))
          })
        }
      }
      if (availableArea.length) {
        const res = availableArea.sort((a, b) => b.y - a.y)[0] // 存在多种解，取最优解
        // 根据解来修改基线，进行下次分配
      } else {
        return null // 没有解，减小比例重试
      }
    } else { // 只有一条是声明什么东西都没有
      insertBaseLine({ y: 0, width: size.width }, 0)
    }
    return {
      scale,
      x,
      y
    }
  }
  while (windows.length) {
    const curr = windows.shift()
    if (!curr) {
      break
    }
    if (res.length === 0) {
      res.push({ bind: curr, ...alloc(curr) })
    } else {
      if (heightCursor > availableHeight) { // 排到外面去了，减小比例，重新来
        scale -= 0.1
        windows = [..._windows]
        resetArray(res)
      }
    }
  }
}

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
    const bodyRect = ref<DOMRect>()
    const ro = new ResizeObserver(body => {
      bodyRect.value = body[0].contentRect
    })
    provide('windows', windows)
    provide('window-regist', (window: windowState) => {
      windows.push(window)
    })
    const selfRef = ref<HTMLDivElement | null>(null)
    onMounted(() => {
      const dom = selfRef.value
      if (dom) {
        ro.observe(dom)
      }
    })
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const style = computed(() => `background-image:url(${props.bgUrl})`)
    useAutoLayout(windows, bodyRect)
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
