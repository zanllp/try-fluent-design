<template>
  <window name="日历" :size="{ height: 550, width: 448 }">
    <block-container>
      <div class="profile">
        <div class="action-bar">
          <block>
            <div class="action-icon" @click="onActionBtnClick('decr')">←</div>
          </block>
          <block>
            <div class="action-icon" @click="onActionBtnClick('incr')">→</div>
          </block>
        </div>
        <div class="title">{{day.format('L')+bp}}</div>
      </div>
      <div>
        <span v-for="n in 7" :key="n" class="table-cell block-adapter">星期{{bucketsMap[n-1]}}</span>
        <div v-for="(week,idx) in buckets" :key="idx">
          <span v-for="(dayN,dayIdx) in week" :key="dayIdx">
            <block
              v-if="dayN !== undefined"
              class="day table-cell"
              :data-now="day.get('date')===dayN"
              @click="onDayBtnClick(dayN)"
            >{{dayN}}</block>
            <div v-else class="block-adapter table-cell" />
          </span>
        </div>
      </div>
    </block-container>
  </window>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'
import { createArray, useReactiveBreakPoint } from '@/util'
dayjs.locale('zh-cn')
dayjs.extend(LocalizedFormat)
/**
 * 获取指定月份，年份里多少天，月份0-11
 */
const daysInMonth = (month: number, year: number) => {
  return dayjs().set('year', year).set('month', month + 1).set('date', -1).get('date') + 1
}
export default defineComponent({
  setup () {
    const day = ref(dayjs())
    const days = computed(() => daysInMonth(day.value.get('month'), day.value.get('year')))
    const onActionBtnClick = (act: 'incr' | 'decr') => {
      switch (act) {
        case 'incr':
          day.value = day.value.add(1, 'month')
          break
        case 'decr':
          day.value = day.value.subtract(1, 'month')
          break
      }
    }
    const onDayBtnClick = (nextDay: number) => {
      day.value = day.value.set('date', nextDay)
    }
    const buckets = computed(() =>
      createArray(days.value, i => i + 1)
        .reduce<Array<Array<number>>>((p, c) => {
          const currDay = day.value.set('date', c)
          const dayIndex = currDay.get('day')
          let week: Array<number>
          if (dayIndex === 0 || p[p.length - 1].length > 6) { // 当星期天或者上周排满时
            week = new Array<number>()
            p.push(week)
          } else {
            week = p[p.length - 1]
          }
          week[dayIndex] = c
          return p
        }, [[]]
        )
    )
    const bucketsMap = '天一二三四五六'
    const bp = useReactiveBreakPoint()
    return {
      days,
      day,
      onActionBtnClick,
      onDayBtnClick,
      bucketsMap,
      buckets,
      bp
    }
  }
})
</script>

<style lang="scss" scoped>
@mixin CalcWidth($per) {
  width: 100% * $per / 24;
}
.col-1 {
  @include CalcWidth(1);
}
.col-2 {
  @include CalcWidth(2);
}
.col-3 {
  @include CalcWidth(3);
}
.col-4 {
  @include CalcWidth(4);
}
.col-5 {
  @include CalcWidth(5);
}
.col-6 {
  @include CalcWidth(6);
}
.col-7 {
  @include CalcWidth(7);
}
.col-8 {
  @include CalcWidth(8);
}
.col-9 {
  @include CalcWidth(9);
}
.col-10 {
  @include CalcWidth(2);
}
.col-11 {
  @include CalcWidth(2);
}
.col-12 {
  @include CalcWidth(2);
}
.col-13 {
  @include CalcWidth(2);
}
.col-14 {
  @include CalcWidth(2);
}
.col-15 {
  @include CalcWidth(2);
}
.col-16 {
  @include CalcWidth(2);
}
.col-17 {
  @include CalcWidth(2);
}
.col-18 {
  @include CalcWidth(2);
}
.col-19 {
  @include CalcWidth(2);
}
.col-20 {
  @include CalcWidth(2);
}
.col-21 {
  @include CalcWidth(2);
}
.col-22 {
  @include CalcWidth(2);
}
.col-23 {
  @include CalcWidth(2);
}
.col-24 {
  @include CalcWidth(2);
}
</style>
