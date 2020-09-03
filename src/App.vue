<template>
  <window-container class="window-manage" :bg-url="bgUrl">
    <calculator/>
    <calendar/>
    <layout/>
  </window-container>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from 'vue'
import { sharedState } from './store'
import { createArray } from './util'
import calculator from '@/example/calculator.vue'
import calendar from '@/example/calendar.vue'
import layout from '@/example/reactive-layout.vue'
const bgUrl = 'https://static.ioflow.link/0cfedb5240eadc505e723bf2bc4f14e8bf7eb3fb96fc6ea53e856f3f863c2ba0d38f83de492f609290bc6ad0a9a2b583.jpg_'
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
