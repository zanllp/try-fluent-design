<template>
  <div class="window-container" ref="selfRef" id="bg" @mousemove="onMouseMove">
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
      <any-block-container>
        <any-block v-for="block in blocks" :key="block" :value="block">
          {{block}}
        </any-block>
        <any-block v-for="block in blocks" :key="block" :value="block">
          {{block}}
        </any-block>
        <any-block>1</any-block>
        <any-block style="cursor:pointer;">hello world</any-block>
      </any-block-container>
    </window>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, reactive } from 'vue'
import { getCallBackQuene } from './callbackPoll'
import { sharedState } from './store'
import blockContainer from '@/components/block-container.vue'
import block from './components/block.vue'
import anyBlock from './components/any-block.vue'
import anyBlockContainer from './components/any-block-container.vue'

export default defineComponent({
  components: {
    // blockContainer,
    // block,
    anyBlockContainer,
    anyBlock
  },
  name: 'App',
  setup () {
    const selfRef = ref<HTMLDivElement | null>(null)
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const windows = reactive(
      Array(3).fill(null).map((_, i) => ({
        top: 256 + i * 72,
        left: 256 + i * 72,
        i
      }))
    )
    const blocks = reactive(Array(26).fill(null).map((_, idx) => String.fromCharCode(65 + idx)))
    return {
      window,
      selfRef,
      onMouseMove,
      darkMode: toRef(sharedState, 'darkMode'),
      windows,
      blocks
    }
  }
})
</script>

<style lang="scss">
.window-container {
  // background-image: url('./assets/sion.jpg');
  background-size: 100vw;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 128px;
  box-sizing: border-box;
}
</style>
