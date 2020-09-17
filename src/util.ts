import { sharedState } from './store'
import { inject, computed, readonly, Prop, PropType } from 'vue'

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
/**
 * 断点标志位的权重映射，匹配的尺寸越大，优先级越低
 */
export const breakPointPriorityMap: { [k in BreakPointFlag]: number } = {
  xs: 0,
  sm: -1,
  md: -2,
  lg: -3,
  xl: -4
}

/**
 * 断点优先级降序
 */
export const breakPointPriorityList = readonly<BreakPointFlag[]>(['xs', 'sm', 'md', 'lg', 'xl'])

/**
 * 断点标志列表优先级升序
 */
export const breakPointPriorityListAsc = readonly([...breakPointPriorityList].reverse())
/**
 * 返回断点标志在当前窗口尺寸下是否可用
 */
export const useBreakPoint = () => {
  const size = inject<Size>('window-size')
  if (!size) {
    throw new Error('useBreakPoint必须在window组件的包裹的组件内')
  }
  return computed(() => {
    const w = size.width
    return {
      xs: w < 578,
      sm: w < 768,
      md: w < 992,
      lg: w < 1200,
      xl: true
    } as { [k in BreakPointFlag]: boolean }
  })
}

/**
 * 返回可用的断点标志,按优先级降序
 */
export const usePriorityBreakPoint = () => {
  const breakPoint = useBreakPoint()
  return computed(() => {
    return Object.entries(breakPoint.value)
      .filter(pair => pair[1])
      .sort((a, b) => breakPointPriorityMap[b[0] as BreakPointFlag] - breakPointPriorityMap[a[0] as BreakPointFlag])
      .map(pair => pair[0] as BreakPointFlag)
  })
}

export const resetArray = function <T> (arr: Array<T>, ...rest: T[]) {
  arr.splice(0, arr.length, ...rest)
  return arr
}

export function curry<T, T1, T2> (fn: (a: T1, b: T2) => T, a: T1): (b: T2) => T;
export function curry<T, T1, T2, T3> (fn: (a: T1, b: T2, c: T3) => T, a: T1): (b: T2, c: T3) => T;
export function curry (fn: any, ...bindArg: any[]) {
  return (...restArg: any[]) => fn(...bindArg, ...restArg)
}

(Array.prototype as any).groupBy = function<T> (this: Array<T>, key: keyof T) {
  return this.reduce((p, c) => {
    const v = c[key]
    const targetBucket = p.find(x => x[0][key] === v)
    if (targetBucket) {
      targetBucket.push(c)
    } else {
      p.push([c])
    }
    return p
  }, [] as T[][])
}

/**
 * vue props用于推导自定义类型的辅助函数
 * @example
 * props: {
 *   data: customPropsType<Data>(), // 非空，自定义接口
 *   getState: customPropsType<(id: number) => State>(false), // 可空，函数
 *   enable: customPropsType<boolean>(false, Boolean) // 可空，运行时类型检查
 * }
 * @param required 参数必填 默认true
 * @param type 传入构造函数进行动态检查
 */
export function customPropsType <T extends Function> (required?: true, type?: PropType<T>): { type: PropType<T> ; required: true };
export function customPropsType <T extends Function> (required: boolean, type?: PropType<T>): { type: PropType<T> };
export function customPropsType <T> (required?: true, type?: PropType<T>): Prop<T> & { required: true };
export function customPropsType <T> (required: boolean, type?: PropType<T>): Prop<T>;
export function customPropsType (required: any = true, type: any) {
  return {
    type: type || null, // ts没办法通过在不传入参数的情况下，通过泛型实现不同的函数定义。类型定义够多的情况下，使用静态类型检查足矣
    required
  }
}
