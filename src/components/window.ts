import { computed, inject, reactive } from 'vue'
import { getIncrementId, Size } from '@/util'

export type StateFlag = 'start' | 'resize' | 'animal' | 'ani-delay' | 'tile'
const cursorMap: { [k in StateFlag]?: string } = {
  start: 'move',
  resize: 'nwse-resize'
}
type Pos = { top: number; left: number }
export const useInitState = (initPos: Pos, name: string, size: Size) => {
  return reactive({
    offset: { top: 0, left: 0 },
    size,
    zIndex: 0,
    backgroundPos: { top: 0, left: 0 },
    flagSet: new Set<StateFlag>(),
    initPos,
    name,
    scale: 1,
    id: getIncrementId('window'),
    styles: new Array<string>()
  })
}
export type windowState = ReturnType<typeof useInitState>
export const useWindowWrapStyle = (state: windowState) => {
  const s = state
  const style = computed(() => {
    const bgPos = {
      // 2边框，16白边切除的补偿
      top: (-s.offset.top - s.initPos.top) / state.scale - 2 + 16,
      left: (-s.offset.left - s.initPos.left) / state.scale - 2 + 16
    }
    const styleList = new Array<string>()
    styleList.push(`
    background-position:${bgPos.left}px ${bgPos.top}px;
    transform:translate(${s.offset.left + s.initPos.left}px,${s.offset.top + s.initPos.top}px) scale(${s.scale});
    cursor:${cursorMap[Array.from(s.flagSet.keys())[0]]};
    width:${s.size.width}px;
    height:${s.size.height}px;
    z-index:${s.zIndex};
    background-size:${(1 / state.scale) * 100}vw;
    transform-origin: top left;`)
    if (state.flagSet.has('animal')) {
      styleList.push('transition: all .7s ease')
    }
    if (state.flagSet.has('ani-delay')) {
      styleList.push('transition-delay: .1s')
    }
    return [...state.styles, ...styleList].join(';')
  })
  return {
    style
  }
}

export let maxZIndex = 1
export const incrMaxZindex = () => ++maxZIndex
/**
 * 窗口移动和组件重置
 */
export const useWindowControl = (state: windowState) => {
  const addTrigrWindow = inject<(type: 'click', winstate: windowState) => void>('add-trigger-window')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const control = (_e: MouseEvent) => {
    addTrigrWindow && addTrigrWindow('click', state)
    state.flagSet.add('start')
    if (state.zIndex < maxZIndex) {
      console.log(state.flagSet.has('animal'))
      state.zIndex = maxZIndex + 1 // 让点击到窗口保持在最上层
      maxZIndex = state.zIndex
    }
  }
  const stateStack = new Array<Array<StateFlag>>()
  const s = state
  const release = (e: MouseEvent) => {
    if (s.flagSet.has('tile')) {
      return
    }
    const { type } = e
    switch (type) {
      case 'mouseleave':
        !s.flagSet.has('resize') && s.flagSet.clear()
        break
      case 'mouseup':
        s.flagSet.clear()
        break
    }
  }
  const move = (e: MouseEvent) => {
    if (s.flagSet.has('tile')) {
      return
    }
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
