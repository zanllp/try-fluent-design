import { computed, reactive } from 'vue'

export type State = 'start' | 'resize';
const cursorMap: { [k in State]: string } = {
  start: 'move',
  resize: 'nwse-resize'
}
type Pos = { top: number; left: number };
type Size = { width: number; height: number };
export const useInitState = (initPos: Pos) => {
  return reactive({
    containerPos: { top: 0, left: 0 },
    size: { width: 512, height: 256 },
    zIndex: 0,
    backgroundPos: { top: 0, left: 0 },
    flagSet: new Set<State>(),
    initPos
  })
}
type windowState = ReturnType<typeof useInitState>
export const useWindowWrapStyle = (state: windowState) => {
  const s = state
  const style = computed(() => {
    const bgPos = {
      // 2边框，16白边切除的补偿
      top: -s.containerPos.top - s.initPos.top - 2 + 16,
      left: -s.containerPos.left - s.initPos.left - 2 + 16
    }
    return `
          background-position:${bgPos.top}px ${bgPos.left}px;
          transform:translate(${s.containerPos.top}px,${s.containerPos.left}px);
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
let maxZIndex = 0
export const useControl = (state: windowState) => {
  return (e: MouseEvent) => {
    state.flagSet.add('start')
    state.zIndex = maxZIndex + 1 // 让点击到窗口保持在最上层
    maxZIndex++
  }
}
/**
 * 窗口移动和组件重置
 */
export const useMouseMoveControl = (state: windowState) => {
  const stateStack = new Array<Array<State>>()
  const s = state
  return (e: MouseEvent) => {
    if (s.flagSet.has('start')) {
      if (s.flagSet.has('resize')) {
        s.size.width += e.movementX
        s.size.height += e.movementY
      } else {
        s.containerPos.top += e.movementX
        s.containerPos.left += e.movementY
      }
    }
    if (
      s.containerPos.top + s.initPos.top + s.size.width - e.pageX > 0 &&
      s.containerPos.top + s.initPos.top + s.size.width - e.pageX < 16 &&
      s.containerPos.left + s.initPos.left + s.size.height - e.pageY > 0 &&
      s.containerPos.left + s.initPos.left + s.size.height - e.pageY < 16
    ) {
      if (!s.flagSet.has('resize')) {
        stateStack.push(Array.from(s.flagSet))
      }
      s.flagSet.add('resize')
    } else {
      let lastState = stateStack.pop()
      while (lastState && lastState.includes('resize')) {
        lastState = stateStack.pop()
      }
      if (lastState) {
        s.flagSet.clear()
        lastState.forEach(state => s.flagSet.add(state))
      }
    }
  }
}
