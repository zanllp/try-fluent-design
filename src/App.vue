<template>
  <window-container class="window-manage" :bgUrl="bgUrl">
    <window v-for="window in windows" :key="window.i" :init-pos="window">
      <span>暗黑模式</span>
      <input type="checkbox" v-model="darkMode" />
      <h1>Create a responsive layout-{{window.i + 1}}</h1>
      <p>
        For an app to feel natural, it should adapt its layout to different screen sizes and devices.
        You can use automatic sizing, layout panels, visual states, and even separate UI definitions
        in XAML to create a responsive UI.
      </p>
    </window>
    <window :init-pos="{ top: 512, left: 480 }">
      <block-container>
        <block v-for="block in blocks" :key="block" :value="block" style="padding:4px;">{{block}}</block>
        <block v-for="block in blocks" :key="block" :value="block" style="margin:4px;">{{block}}</block>
        <block>1</block>
        <block style="cursor:pointer;">hello world</block>
      </block-container>
    </window>
  </window-container>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from 'vue'
import { sharedState } from './store'
const bgUrl = 'https://static.ioflow.link/0cfedb5240eadc505e723bf2bc4f14e8bf7eb3fb96fc6ea53e856f3f863c2ba0d38f83de492f609290bc6ad0a9a2b583.jpg'
export default defineComponent({
  name: 'App',
  setup () {
    const windows = reactive(
      Array(3)
        .fill(null)
        .map((_, i) => ({
          top: 256 + i * 72,
          left: 256 + i * 72,
          i
        }))
    )
    const blocks = reactive(
      Array(26)
        .fill(null)
        .map((_, idx) => String.fromCharCode(65 + idx))
    )
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
