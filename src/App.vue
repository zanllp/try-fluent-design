<template>
  <div class="block-container" ref="selfRef" id="bg" @mousemove="onMouseMove">
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
    <window>
      <block-container>
        <block v-for="block in blocks" :key="block">
          {{block}}
        </block>
      </block-container>
    </window>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, reactive } from 'vue'
import { getCallBackQuene } from './callbackPoll'
import { sharedState } from './store'
import blockContainer from '@/components/block-container.vue'
import block from './components/block.vue'

export default defineComponent({
  components: {
    blockContainer,
    block
  },
  name: 'App',
  setup () {
    const selfRef = ref<HTMLDivElement | null>(null)
    const onMouseMove = (e: MouseEvent) => {
      getCallBackQuene('mousemove').forEach((cb) => cb(e))
    }
    const windows = reactive(
      new Array<{ top: number; left: number; i: number }>(3)
    )
    for (let i = 0; i < windows.length; i++) {
      windows[i] = {
        top: 256 + i * 72,
        left: 256 + i * 72,
        i
      }
    }
    const blocks = Array(26).fill(null)
    blocks.forEach((_, idx) => {
      blocks[idx] = String.fromCharCode(65 + idx)
    })
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
.block-container {
  background-image: url('./assets/sion.jpg');
  background-size: 100vw;
  margin: 0;
}
.block-container {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  flex-wrap: wrap;
  padding: 128px;
  box-sizing: border-box;
  .block {
    margin: 8px;
  }
}
</style>
