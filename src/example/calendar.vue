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
        <div class="title">{{day.format('L')}}</div>
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
import { createArray } from '@/util'
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
    return {
      days,
      day,
      onActionBtnClick,
      onDayBtnClick,
      bucketsMap,
      buckets
    }
  }
})
</script>

<style lang="scss" scoped>
.table-cell {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  text-align: center;
  width: 48px;
}
.block-adapter {
  border: 2px solid transparent;
  margin: 2px;
}
.day {
  cursor: pointer;
  border: transparent 2px solid;
  &[data-now="true"] {
    border: rgb(197, 197, 197) 2px solid;
  }
}
.title {
  display: inline-block;
  margin: 0 16px;
}
.action-bar {
  display: inline-block;
  margin: 16px 0;
  .action-icon {
    padding: 8px;
    cursor: pointer;
    display: inline-block;
  }
}
</style>
