<template>
  <window-container :bg-url="bgUrl">
    <calculator />
    <calendar />
    <layout />
    <calculator />
    <calendar />
    <layout />
    <calculator />
    <calendar />
    <layout />
    <calculator />
    <calendar />
    <layout />
    <calculator />
    <calendar />
    <layout />
    <calculator />
    <calendar />
    <layout />
  </window-container>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from 'vue'
import { sharedState } from './store'
import { createArray } from './util'
import calculator from '@/example/calculator.vue'
import calendar from '@/example/calendar.vue'
import layout from '@/example/reactive-layout.vue'
const bgUrl = 'https://zanllp.github.io/img/icons/natsuki_koyomi1920_1080.jpg'
export default defineComponent({
  components: {
    calculator,
    calendar,
    layout
  },
  name: 'App',
  setup () {
    const blocks = reactive(createArray(6, idx => String.fromCharCode(65 + idx)))
    return {
      window,
      darkMode: toRef(sharedState, 'darkMode'),
      blocks,
      bgUrl
    }
  }
})
</script>
