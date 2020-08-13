/* eslint-disable vue/custom-event-name-casing */
<template>
  <div class="block-container" ref="selfRef"  id="bg">
    <window />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import window from './components/window.vue'

export default defineComponent({
  name: 'App',
  components: {
    window
  },
  setup () {
    const selfRef = ref<HTMLDivElement | null>(null)
    return {
      window,
      selfRef
    }
  }
})
</script>

<style lang="scss">
.block-container {
  background-image: url("./assets/forest.jpg");
  // background-size: cover;
  // background-position: center;
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
