import { sharedState } from './store'
import { inject, computed } from 'vue'

export const num2color = (c: number) => {
  const r = c >> 16
  const g = (c >> 8) & 0xff
  const b = c & 0xff
  return [r, g, b]
}
export type BlockState = {
  value?: string;
  rect: {
    height: number;
    width: number;
  };
}
export type Size = BlockState['rect']
export type AnyBlockState = {
  value?: string;
  rect: DOMRect | null;
  id: number;
}
/**
 * 共享状态里获取一个自增id
 */
export const getIncrementId = (type: keyof typeof sharedState.idPool) => {
  const arr = sharedState.idPool[type]
  const id = arr.length !== 0 ? arr[arr.length - 1] + 1 : 0
  arr.push(id)
  return id
}

export const createArray = <T>(num: number, createFn: (index: number) => T) => {
  return Array(num)
    .fill(null)
    .map((_, i) => createFn(i))
}

export type BreakPointFlag = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export const useReactiveBreakPoint = () => {
  const size = inject<Size>('window-size')
  if (!size) {
    throw new Error('useReactiveBreakPoint必须在window组件的包裹的组件内')
  }
  console.log(size)
  return computed(() => {
    const w = size.width
    if (w < 578) {
      return 'xs'
    } else if (w < 768) {
      return 'sm'
    } else if (w < 992) {
      return 'md'
    } else if (w < 1200) {
      return 'lg'
    } else {
      return 'xl'
    }
  })
}
