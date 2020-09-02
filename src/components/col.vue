<template>
  <div :class="[...classList,'base-col-class']">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue'
import { BreakPointFlag, usePriorityBreakPoint, breakPointPriorityListAsc } from '@/util'

type BreakPointObjPart = { [k in BreakPointFlag]?: number }
type ColParams = number|BreakPointObjPart
type ColParamsRef = ComputedRef<ColParams>

const useColClass = (breakPoint: ReturnType<typeof usePriorityBreakPoint>, offset: ColParamsRef, span: ColParamsRef) => {
  const classList = computed(() => {
    const list = new Array<string>()
    const o = offset.value
    const s = span.value
    const bp = breakPoint.value
    // 在所有实现中优先使用最小尺寸，如果没实现，从这个位置向最大进行匹配
    if (typeof o === 'number') {
      list.push(`col-offset-${o}`)
    } else {
      const availableBreakPoint = bp.filter(flag => o[flag])[0] // 选取实现了且优先级最高的
      if (availableBreakPoint) {
        list.push(`col-offset-${o[availableBreakPoint]}`)
      } else { // 没实现进行回退
        const priorityList = breakPointPriorityListAsc
        const topPriority = bp[0]
        for (let index = priorityList.indexOf(topPriority) + 1; index < priorityList.length; index++) {
          if (o[priorityList[index]]) {
            list.push(`col-offset-${o[priorityList[index]]}`)
            break
          }
        }
      }
    }
    if (typeof s === 'number') {
      list.push(`col-span-${s}`)
    } else {
      const availableBreakPoint = bp.filter(flag => s[flag])[0]
      if (availableBreakPoint) {
        list.push(`col-span-${s[availableBreakPoint]}`)
      } else { // 没实现进行回退
        const priorityList = breakPointPriorityListAsc
        const topPriority = bp[0]
        for (let index = priorityList.indexOf(topPriority) + 1; index < priorityList.length; index++) {
          if (s[priorityList[index]]) {
            list.push(`col-span-${s[priorityList[index]]}`)
            break
          }
        }
      }
    }
    return list
  })
  return {
    classList
  }
}
export default defineComponent({
  name: 'fd-col',
  props: {
    span: {
      default: () => {
        if (' '.length) { // 这么做是因为vue弱鸡的类型推断
          throw new Error('col组件的span必填！')
        }
        return 0 as string | ColParams
      }
    },
    offset: {
      default: 0 as number | ColParams
    }
  },
  setup (props) {
    const breakPoint = usePriorityBreakPoint()
    const span = computed(() => {
      const s = props.span
      const res = typeof s === 'string' ? Number(s) : s
      return res
    })
    const offset = computed(() => {
      const o = props.offset
      const res = typeof o === 'string' ? Number(o) : o
      return res
    })
    const { classList } = useColClass(breakPoint, offset, span)
    return {
      classList
    }
  }
})
</script>

<style lang="scss" scoped>
.base-col-class {
  display: inline-block;
}
@mixin CalcSpan($per) {
  width: 100% * $per / 24;
}
@mixin CalcOffset($per) {
  margin-left: 100% * $per / 24;
}
.col-span-0 {
  @include CalcSpan(0);
}
.col-span-1 {
  @include CalcSpan(1);
}
.col-span-2 {
  @include CalcSpan(2);
}
.col-span-3 {
  @include CalcSpan(3);
}
.col-span-4 {
  @include CalcSpan(4);
}
.col-span-5 {
  @include CalcSpan(5);
}
.col-span-6 {
  @include CalcSpan(6);
}
.col-span-7 {
  @include CalcSpan(7);
}
.col-span-8 {
  @include CalcSpan(8);
}
.col-span-9 {
  @include CalcSpan(9);
}
.col-span-10 {
  @include CalcSpan(10);
}
.col-span-11 {
  @include CalcSpan(11);
}
.col-span-12 {
  @include CalcSpan(12);
}
.col-span-13 {
  @include CalcSpan(13);
}
.col-span-14 {
  @include CalcSpan(14);
}
.col-span-15 {
  @include CalcSpan(15);
}
.col-span-16 {
  @include CalcSpan(16);
}
.col-span-17 {
  @include CalcSpan(17);
}
.col-span-18 {
  @include CalcSpan(18);
}
.col-span-19 {
  @include CalcSpan(19);
}
.col-span-20 {
  @include CalcSpan(20);
}
.col-span-21 {
  @include CalcSpan(12);
}
.col-span-22 {
  @include CalcSpan(22);
}
.col-span-23 {
  @include CalcSpan(23);
}
.col-span-24 {
  @include CalcSpan(24);
}
.col-offset-0 {
  @include CalcOffset(0);
}
.col-offset-1 {
  @include CalcOffset(1);
}
.col-offset-2 {
  @include CalcOffset(2);
}
.col-offset-3 {
  @include CalcOffset(3);
}
.col-offset-4 {
  @include CalcOffset(4);
}
.col-offset-5 {
  @include CalcOffset(5);
}
.col-offset-6 {
  @include CalcOffset(6);
}
.col-offset-7 {
  @include CalcOffset(7);
}
.col-offset-8 {
  @include CalcOffset(8);
}
.col-offset-9 {
  @include CalcOffset(9);
}
.col-offset-10 {
  @include CalcOffset(10);
}
.col-offset-11 {
  @include CalcOffset(11);
}
.col-offset-12 {
  @include CalcOffset(12);
}
.col-offset-13 {
  @include CalcOffset(13);
}
.col-offset-14 {
  @include CalcOffset(14);
}
.col-offset-15 {
  @include CalcOffset(15);
}
.col-offset-16 {
  @include CalcOffset(16);
}
.col-offset-17 {
  @include CalcOffset(17);
}
.col-offset-18 {
  @include CalcOffset(18);
}
.col-offset-19 {
  @include CalcOffset(19);
}
.col-offset-20 {
  @include CalcOffset(20);
}
.col-offset-21 {
  @include CalcOffset(12);
}
.col-offset-22 {
  @include CalcOffset(22);
}
.col-offset-23 {
  @include CalcOffset(23);
}
.col-offset-24 {
  @include CalcOffset(24);
}
</style>
