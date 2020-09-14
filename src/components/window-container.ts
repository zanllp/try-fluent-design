
import { resetArray, curry } from '@/util'
import { cloneDeep } from 'lodash'
import { watch } from 'vue'
import { windowState } from './window'
export type BaseLine = { y: number; width: number }

/**
 * 获取指定块在目标基线序列中的起始位置
 * @param baselines 基线序列
 * @param index 目标基线索引
 */
export const getStartPosPF = (baselines: BaseLine[], index: number) => {
  return baselines.slice(0, index).reduce((p, c) => p + c.width, 0)
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
 * @param baselines 原始基线序列
 * @param base  插入的基线
 * @param start 插入起始位置
 */
export const insertBaseLinePF = (_baselines: BaseLine[], base: BaseLine, start: number) => {
  const baselines = cloneDeep(_baselines)
  const allWidth = baselines.reduce((p, c) => p + c.width, 0)
  const maxY = baselines.reduce((p, c) => p > c.y ? p : c.y, 0)
  if (allWidth <= base.width && maxY <= base.y) {
    return resetArray(baselines, base)
  }
  const getStartPos = curry(getStartPosPF, baselines)
  const end = start + base.width
  let startBase: BaseLine | undefined // 插入后的受影响范围
  let endBase: BaseLine | undefined
  for (let index = 0; index < baselines.length; index++) {
    const curr = baselines[index]
    const currbaselinestartPos = getStartPos(index) // 前面所有基线加起来的宽度
    if (!startBase && (currbaselinestartPos <= start && start <= currbaselinestartPos + curr.width)) {
      startBase = curr
    }
    if (currbaselinestartPos <= end && end <= currbaselinestartPos + curr.width) {
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
  const startIdx = baselines.indexOf(startBase)
  const endIdx = baselines.indexOf(endBase)
  const newStart: BaseLine = {
    y: startBase.y,
    width: start - getStartPos(startIdx)
  }
  const newEnd: BaseLine = {
    y: endBase.y,
    width: getStartPos(endIdx) + endBase.width - (getStartPos(startIdx) + newStart.width + base.width)
  }
  baselines.splice(startIdx, endIdx - startIdx + 1, newStart, base, newEnd)
  while (baselines.find(bl => !bl.width)) {
    baselines.splice(baselines.findIndex(bl => bl.width < 1), 1)
  }
  debug(baselines, '更新基线')
  return baselines
}

export const scanPF = (conf: AllocConf, needWidth: number) => {
  const { baselines, maxWidth } = conf
  const getStartPos = curry(getStartPosPF, baselines)
  /**
     * 搜索可用路径
     * @param base 当前块
     * @param seq 累计结果序列
     */
  const scan = (base: BaseLine, ...seq: BaseLine[]): null | { start: number; bls: BaseLine[] } => {
    seq.push(base)
    const idx = baselines.indexOf(base)
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
    if (idx + 1 === baselines.length || firstEleStartPos + reduceWidth > maxWidth) { // 移到最右侧或者放不下 换下一行
      const nextY = baselines.reduce((p, c) => p > c.y ? p : c.y, 0)
      return {
        start: 0,
        bls: [{
          width: needWidth,
          y: nextY
        }]
      }
    }
    return scan(baselines[idx + 1], ...seq) // 继续向右找
  }
  return scan
}

type AllocConf = {
  baselines: BaseLine[];
  scale: number;
  maxHeight: number;
  maxWidth: number;
  margin: number;
  hasInsertFirst: boolean;
}

const alloc = (conf: AllocConf, curr: windowState) => {
  const { baselines, scale, margin } = conf
  const insertBaseLine = curry(insertBaseLinePF, baselines)
  let x = 0
  let y = 0
  const { size } = curr
  if (conf.hasInsertFirst === true) {
    const needWidth = size.width * scale + margin * 2
    const availableArea = new Array<{ start: number; baseLine: BaseLine }>()
    for (const base of baselines) {
      const res = scanPF(conf, needWidth)(base)
      if (res) { // 将求得的解合并
        availableArea.push({
          baseLine: {
            width: needWidth,
            // 旧基线 + 窗口高度 + 外边距
            y: Math.max(...res.bls.map(x => x.y)) + curr.size.height * scale + margin * 2
          },
          start: res.start
        })
      }
    }
    if (availableArea.length && availableArea[0].baseLine.y !== 0) {
      const res = availableArea.sort((a, b) => a.baseLine.y - b.baseLine.y)[0] // 存在多种解，取最优解
      x = res.start
      y = res.baseLine.y - curr.size.height * scale - margin * 2
      if (res.baseLine.y > conf.maxHeight) { // 超出边界，减小比例重新分配
        return null
      }
      // 接受这个解并修改基线，进行下次分配
      const newBaseLine = insertBaseLine(res.baseLine, res.start)
      resetArray(baselines, ...newBaseLine)
    } else {
      return null // 没有解，减小比例重试
    }
  } else { // 第一个可以直接放在左上角
    const y = size.height * scale + margin * 2
    const width = size.width * scale
    debug({ y, width }, '新插入基线-')
    const res = insertBaseLine({ y, width }, 0)
    resetArray(baselines, ...res)
  }
  conf.hasInsertFirst = true
  return {
    scale,
    x,
    y
  }
}

export type ContainersState = {
  windows: windowState[];
  bodyRect: DOMRect | null;
  windowTriggerPool: Map<'click', windowState[]>;
  flagSet: Set<'window-switch'>;
}

type Layout = { bind: windowState; scale: number; x: number; y: number }

const watchExpandTrigger = (state: ContainersState, res: Layout[], stateBackup: windowState[]) => {
  const stop = watch(state.windowTriggerPool, val => {
    val.get('click')?.forEach(() => {
      stop()
      const getPrevCurrForeach = () => {
        const pc = res
          .map(s => ({ e: stateBackup.find(backup => backup.id === s.bind.id)!, s }))
        return pc.forEach.bind(pc)
      }
      getPrevCurrForeach()(({ s, e }) => {
        s.bind.flagSet.add('animal')
        s.bind.flagSet.delete('start')
        s.bind.scale = e.scale
        s.bind.initPos = e.initPos
        s.bind.offset = e.offset
      })
      setTimeout(() => {
        getPrevCurrForeach()(({ s }) => {
          s.bind.flagSet.delete('tile')
          s.bind.flagSet.delete('animal')
        })
      }, 700)
      val.delete('click')
      state.flagSet.delete('window-switch')
    })
  })
}

type Padding = { top: number; left: number; right: number; bottom: number }
const startTileAnimal = (res: Layout[], containerPadding: Padding, windowMargin: number, state: ContainersState, stateBackup: windowState[]) => {
  const se = res.map(start => {
    const end = cloneDeep(start.bind)
    end.initPos = {
      top: 0,
      left: 0
    }
    end.offset = {
      top: start.y + containerPadding.top + windowMargin,
      left: start.x + containerPadding.left + windowMargin
    }
    end.scale = start.scale
    return {
      start,
      end
    }
  })
  se.forEach(({ start: s, end: e }) => {
    s.bind.flagSet.delete('start')
    s.bind.flagSet.add('tile')
    s.bind.flagSet.add('animal')
    s.bind.scale = e.scale
    s.bind.initPos = e.initPos
    s.bind.offset = e.offset
  })
  setTimeout(() => {
    se.forEach(({ start: s }) => {
      s.bind.flagSet.delete('animal')
    })
    watchExpandTrigger(state, res, stateBackup)
  }, 700)
  state.flagSet.add('window-switch')
}

export const useAutoLayout = (state: ContainersState) => {
  if (state.flagSet.has('window-switch')) {
    return
  }
  const _windows = state.windows
  const { bodyRect } = state
  const stateBackup = cloneDeep(_windows)
  const body = bodyRect
  const containerPadding = {
    top: 16,
    left: 16,
    right: 160,
    bottom: 16
  }
  const windowMargin = 8
  if (!body) {
    return
  }
  const res = new Array<Layout>()
  const availableWidth = body.width - containerPadding.left - containerPadding.right
  const availableHeight = body.height - containerPadding.top - containerPadding.bottom
  const baselines: BaseLine[] = [{ y: 0, width: availableWidth }]
  debug(baselines, '初始基线')
  const windows = [..._windows]
  const conf: AllocConf = {
    baselines,
    scale: 1,
    maxWidth: availableWidth,
    maxHeight: availableHeight,
    hasInsertFirst: false,
    margin: windowMargin
  }
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
      resetArray(baselines, { y: 0, width: availableWidth })
      if (conf.scale < 0) {
        throw new Error('分配异常')
      }
    }
  }
  startTileAnimal(res, containerPadding, windowMargin, state, stateBackup)
  debug(baselines, '结束')
  debug(res)
}
