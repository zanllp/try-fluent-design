
import { resetArray, curry } from '@/util'
import { cloneDeep } from 'lodash'
import { Ref } from 'vue'
import { windowState } from './window'

export type BaseLine = { y: number; width: number }

/**
 * 获取指定块在目标基线序列中的起始位置
 * @param BaseLines 基线序列
 * @param index 目标基线索引
 */
export const getStartPosPF = (BaseLines: BaseLine[], index: number) => {
  return BaseLines.slice(0, index).reduce((p, c) => p + c.width, 0)
}

export const note = (msg: string) => {
  throw new Error(msg)
}
const debug = (x: any, msg = '', enable = false) => {
  if (enable) {
    console.log(msg + (msg ? ': \n' : '') + JSON.stringify(x, null, 4))
  }
}

/**
 * 插入一条新的基线到一组基线中，返回一个新的基线序列
 * @param BaseLines 原始基线序列
 * @param base  插入的基线
 * @param start 插入起始位置
 */
export const insertBaseLinePF = (_BaseLines: BaseLine[], base: BaseLine, start: number) => {
  const BaseLines = cloneDeep(_BaseLines)
  const allWidth = BaseLines.reduce((p, c) => p + c.width, 0)
  const maxY = BaseLines.reduce((p, c) => p > c.y ? p : c.y, 0)
  if (allWidth <= base.width && maxY <= base.y) {
    return resetArray(BaseLines, base)
  }
  const getStartPos = curry(getStartPosPF, BaseLines)
  const end = start + base.width
  let startBase: BaseLine | undefined // 插入后的受影响范围
  let endBase: BaseLine | undefined
  for (let index = 0; index < BaseLines.length; index++) {
    const curr = BaseLines[index]
    const currBaseLineStartPos = getStartPos(index) // 前面所有基线加起来的宽度
    if (!startBase && (currBaseLineStartPos <= start && start <= currBaseLineStartPos + curr.width)) {
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
    debug(startBase, 'start-base')
    debug(endBase, 'end-base')
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
  BaseLines.splice(startIdx, endIdx - startIdx + 1, newStart, base, newEnd)
  while (BaseLines.find(bl => !bl.width)) {
    BaseLines.splice(BaseLines.findIndex(bl => bl.width < 1), 1)
  }
  debug(BaseLines, '更新基线')
  return BaseLines
}

export const scanPF = (conf: AllocConf, needWidth: number) => {
  const { BaseLines, maxWidth } = conf
  const getStartPos = curry(getStartPosPF, BaseLines)
  /**
     * 搜索可用路径
     * @param base 当前块
     * @param seq 累计结果序列
     */
  const scan = (base: BaseLine, ...seq: BaseLine[]): null | { start: number; bls: BaseLine[] } => {
    seq.push(base)
    const idx = BaseLines.indexOf(base)
    const firstEleStartPos = getStartPos(idx - (seq.length - 1))// 序列首个元素的起始位置
    if (seq[0].y < base.y) { // 碰到到个比初始高的放弃
      return null
    }
    const reduceWidth = seq.reduce((p, c) => p + c.width, 0)
    if (reduceWidth >= needWidth && firstEleStartPos + needWidth <= maxWidth) { // 得到一组解决方案
      return {
        bls: seq,
        start: firstEleStartPos
      }
    }
    if (idx + 1 === BaseLines.length || firstEleStartPos + reduceWidth > maxWidth) { // 移到最右侧或者放不下 换下一行
      const nextY = BaseLines.reduce((p, c) => p > c.y ? p : c.y, 0)
      return {
        start: 0,
        bls: [{
          width: needWidth,
          y: nextY
        }]
      }
    }
    return scan(BaseLines[idx + 1], ...seq) // 继续向右找
  }
  return scan
}

type AllocConf = {
  BaseLines: BaseLine[];
  scale: number;
  maxHeight: number;
  maxWidth: number;
  hasInsertFirst: boolean;
}

const alloc = (conf: AllocConf, curr: windowState) => {
  const { BaseLines, scale } = conf
  const insertBaseLine = curry(insertBaseLinePF, BaseLines)
  let x = 0
  let y = 0
  const { size } = curr
  if (conf.hasInsertFirst === true) {
    const needWidth = size.width * scale
    const availableArea = new Array<{ start: number; baseLine: BaseLine }>()
    for (const base of BaseLines) {
      const res = scanPF(conf, needWidth)(base)
      if (res) { // 将求得的解合并
        availableArea.push({
          baseLine: {
            width: needWidth,
            y: Math.max(...res.bls.map(x => x.y)) + curr.size.height * scale
          },
          start: res.start
        })
      }
    }
    if (availableArea.length && availableArea[0].baseLine.y !== 0) {
      const res = availableArea.sort((a, b) => a.baseLine.y - b.baseLine.y)[0] // 存在多种解，取最优解
      x = res.start
      y = res.baseLine.y - curr.size.height * scale
      if (res.baseLine.y > conf.maxHeight) { // 超出边界，减小比例重新分配
        return null
      }
      // 接受这个解并修改基线，进行下次分配
      const newBaseLine = insertBaseLine(res.baseLine, res.start)
      resetArray(BaseLines, ...newBaseLine)
    } else {
      return null // 没有解，减小比例重试
    }
  } else { // 第一个可以直接放在左上角
    debug({ y: size.height * scale, width: size.width * scale }, '新插入基线-')
    const res = insertBaseLine({ y: size.height * scale, width: size.width * scale }, 0)
    resetArray(BaseLines, ...res)
  }
  conf.hasInsertFirst = true
  return {
    scale,
    x,
    y
  }
}

export const useAutoLayout = (_windows: windowState[], bodyRect: Ref<DOMRect | undefined>) => {
  const body = bodyRect.value
  const margin = 16
  const gutter = 16
  if (!body) {
    return
  }
  type Layout = { bind: windowState; scale: number; x: number; y: number }
  const res = new Array<Layout>()
  const availableWidth = body.width
  const availableHeight = body.height
  const BaseLines: BaseLine[] = [{ y: 0, width: availableWidth }]
  debug(BaseLines, '初始基线')
  const windows = [..._windows]
  const conf: AllocConf = { BaseLines, scale: 1, maxWidth: availableWidth, maxHeight: availableHeight, hasInsertFirst: false }
  while (windows.length) {
    const curr = windows.shift()
    if (!curr) {
      break
    }
    const rect = alloc(conf, curr)
    if (rect) {
      res.push({ bind: curr, ...rect })
    } else { // 分配失败
      conf.scale -= 0.05
      resetArray(windows, ..._windows)
      resetArray(res)
      resetArray(BaseLines, { y: 0, width: availableWidth })
      if (conf.scale < 0) {
        throw new Error('分配异常')
      }
    }
  }
  res.forEach(w => {
    const { bind } = w
    bind.initPos = {
      top: 0,
      left: 0
    }
    bind.offset = {
      top: w.y,
      left: w.x
    }
    bind.size.height *= w.scale
    bind.size.width *= w.scale
  })
  debug(BaseLines, '结束')
  debug(res)
}
