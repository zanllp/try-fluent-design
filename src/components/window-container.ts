
import { resetArray, curry } from '@/util'
import { Ref } from 'vue'
import { windowState } from './window'

export type BaseLine = { y: number; width: number }

export const getStartPosPF = (BaseLines: BaseLine[], index: number) => {
  return BaseLines.slice(0, index).reduce((p, c) => p + c.width, 0)
}
const debug = (x: any, msg = '') => console.log(msg + (msg ? ': \n' : '') + JSON.stringify(x, null, 4))
const i = 0
export const insertBaseLinePF = (BaseLines: BaseLine[], base: BaseLine, start: number) => {
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
    BaseLines.splice(BaseLines.findIndex(bl => !bl.width), 1)
  }
  debug(BaseLines, '更新基线')
}
type AllocConf = {
  BaseLines: BaseLine[];
  scale: number;
  maxHeight: number;
  maxWidth: number;
  hasInsertFirst: boolean;
}
const alloc = (conf: AllocConf, curr: windowState) => {
  const { BaseLines, scale, maxWidth } = conf
  const insertBaseLine = curry(insertBaseLinePF, BaseLines)
  let x = 0
  let y = 0
  const { size } = curr
  if (conf.hasInsertFirst === true) {
    const needWidth = size.width
    const availableArea = new Array<{ start: number; baseLine: BaseLine } >()
    const scan = (base: BaseLine, ...seq: BaseLine[]): null | { start: number; bls: BaseLine[] } => {
      const idx = BaseLines.indexOf(base)
      if (
        seq[0].y < base.y ||// 碰到到个比初始高的放弃
        idx === -1// 找不到或者是
      ) {
        return null
      }
      const reduceWidth = [...seq, base].reduce((p, c) => p + c.width, 0)
      if (reduceWidth >= needWidth) { // 得到一组解决方案
        return {
          bls: seq,
          start: reduceWidth - base.width
        }
      }
      if (idx === BaseLines.length - 1 || reduceWidth > maxWidth) { // 移到最右侧或者放不下 换下一行
        const nextY = BaseLines.reduce((p, c) => p > c.y ? p : c.y, 0)
        insertBaseLine({ y: nextY, width: maxWidth }, 0)
        insertBaseLine({ y: nextY + base.y, width: base.width }, 0)
        debug(BaseLines, '插入新行后')
        return {
          start: 0,
          bls: [{
            ...base,
            y: nextY
          }]
        }
      }
      return scan(BaseLines[idx + 1], ...seq, base) // 继续向右找
    }
    for (const base of BaseLines) {
      const res = scan(base, base)
      if (res) { // 将求得的解合并
        availableArea.push({
          baseLine: {
            width: res.bls.reduce((p, c) => c.width + p, 0) * scale,
            y: Math.max(...res.bls.map(x => x.y))
          },
          start: res.start
        })
      }
    }
    if (availableArea.length && availableArea[0].baseLine.y !== 0) {
      const res = availableArea.sort((a, b) => b.baseLine.y - a.baseLine.y)[0] // 存在多种解，取最优解
      x = res.start
      y = res.baseLine.y
      debug(res, '新插入基线')
      debug(curr)
      // 根据解来修改基线，进行下次分配
      insertBaseLine(res.baseLine, res.start)
    } else {
      return null // 没有解，减小比例重试
    }
  } else { // 第一个可以直接放在左上角
    insertBaseLine({ y: size.height, width: size.width }, 0)
    debug({ y: size.height, width: size.width }, '新插入基线-')
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
  const availableWidth = body.width - margin * 2
  const availableHeight = body.height - margin * 2
  const BaseLines: BaseLine[] = [{ y: 0, width: availableWidth }]
  debug(BaseLines, '初始基线')
  let windows = [..._windows]
  let scale = 1
  const conf: AllocConf = { BaseLines, scale, maxWidth: availableWidth, maxHeight: availableHeight, hasInsertFirst: false }
  while (windows.length) {
    const curr = windows.shift()
    if (!curr) {
      break
    }
    const rect = alloc(conf, curr)
    if (rect) {
      res.push({ bind: curr, ...rect })
    } else { // 分配失败
      scale -= 0.1
      windows = [..._windows]
      resetArray(res)
      if (scale < 0) {
        throw new Error('分配异常')
      }
    }
  }
  debug(BaseLines, '结束')
  debug(res)
}
