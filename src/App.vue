<template>
  <window-container class="window-manage" :bg-url="bgUrl">
    <window v-for="window in windows" :key="window.i" :init-pos="window" :name="window.name">
      <span>暗黑模式</span>
      <input v-model="darkMode" type="checkbox" />
      <h1>Create a responsive layout-{{ window.i + 1 }}</h1>
      <p>
        For an app to feel natural, it should adapt its layout to different screen sizes and devices.
        You can use automatic sizing, layout panels, visual states, and even separate UI definitions
        in XAML to create a responsive UI.
      </p>
    </window>
    <window :init-pos="{ top: 512, left: 480 }" name="case">
      <block-container>
        <block v-for="block in blocks" :key="block" :value="block" style="padding:4px;">{{ block }}</block>
        <block v-for="block in blocks" :key="block" :value="block" style="margin:4px;">{{ block }}</block>
        <block>1</block>
        <block style="cursor:pointer;">hello world</block>
      </block-container>
    </window>
    <calculator></calculator>
  </window-container>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from 'vue'
import { sharedState } from './store'
import { createArray } from './util'
import calculator from './components/calculator.vue'
const bgUrl = 'https://static.ioflow.link/0cfedb5240eadc505e723bf2bc4f14e8bf7eb3fb96fc6ea53e856f3f863c2ba0d38f83de492f609290bc6ad0a9a2b583.jpg'
export default defineComponent({
  components: {
    calculator
  },
  name: 'App',
  setup () {
    const windows = reactive(createArray(3,
      i => ({
        top: 256 + i * 72,
        left: 256 + i * 72,
        name: 'window - ' + i,
        i
      }))
    )
    const blocks = reactive(createArray(26, idx => String.fromCharCode(65 + idx)))
    return {
      window,
      darkMode: toRef(sharedState, 'darkMode'),
      windows,
      blocks,
      bgUrl
    }
  }
})
</script>
