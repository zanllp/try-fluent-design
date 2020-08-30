import { computed, reactive } from 'vue'
import { getIncrementId } from '@/util'

export type StateFlag = 'start' | 'resize'
const cursorMap: { [k in StateFlag]: string } = {
  start: 'move',
  resize: 'nwse-resize'
}
type Pos = { top: number; left: number }
export const useInitState = (initPos: Pos) => {
  return reactive({
    offset: { top: 0, left: 0 },
    size: { width: 512, height: 256 },
    zIndex: 0,
    backgroundPos: { top: 0, left: 0 },
    flagSet: new Set<StateFlag>(),
    initPos,
    id: getIncrementId('window')
  })
}
export type windowState = ReturnType<typeof useInitState>
export const useWindowWrapStyle = (state: windowState) => {
  const s = state
  const style = computed(() => {
    const bgPos = {
      // 2边框，16白边切除的补偿
      top: -s.offset.top - s.initPos.top - 2 + 16,
      left: -s.offset.left - s.initPos.left - 2 + 16
    }
    return `
          background-position:${bgPos.left}px ${bgPos.top}px;
          transform:translate(${s.offset.left}px,${s.offset.top}px);
          cursor:${cursorMap[Array.from(s.flagSet.keys())[0]]};
          width:${s.size.width}px;
          height:${s.size.height}px;
          top:${s.initPos.top}px;
          left:${s.initPos.left}px;
          z-index:${s.zIndex}`
  })
  return {
    style
  }
}

let maxZIndex = 1
/**
 * 窗口移动和组件重置
 */
export const useWindowControl = (state: windowState) => {
  const control = (e: MouseEvent) => {
    state.flagSet.add('start')
    if (state.zIndex < maxZIndex) {
      state.zIndex = maxZIndex + 1 // 让点击到窗口保持在最上层
      maxZIndex = state.zIndex
    }
  }
  const stateStack = new Array<Array<StateFlag>>()
  const s = state
  const release = (e: MouseEvent) => {
    const { type } = e
    switch (type) {
      case 'mouseleave':
        !state.flagSet.has('resize') && state.flagSet.clear()
        break
      case 'mouseup':
        state.flagSet.clear()
        break
    }
  }
  const move = (e: MouseEvent) => {
    if (s.flagSet.has('start')) {
      if (s.flagSet.has('resize')) {
        s.size.width += e.movementX
        s.size.height += e.movementY
      } else {
        s.offset.left += e.movementX
        s.offset.top += e.movementY
      }
    }
    const areaLeft = s.offset.left + s.initPos.left + s.size.width
    const areaTop = s.offset.top + s.initPos.top + s.size.height
    const areaSide = 16
    if (areaLeft - e.pageX > 0 && areaLeft - e.pageX < areaSide && areaTop - e.pageY > 0 && areaTop - e.pageY < areaSide) {
      if (!s.flagSet.has('resize')) { // 进入重置区域
        stateStack.push(Array.from(s.flagSet))
      }
      s.flagSet.add('resize')
    } else {
      if (s.flagSet.has('resize')) {
        const lastState = stateStack.pop()
        if (lastState) {
          s.flagSet.clear()
          lastState.forEach(state => s.flagSet.add(state))
        }
      }
    }
  }
  return {
    release,
    control,
    move
  }
}
