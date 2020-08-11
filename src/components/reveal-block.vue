<template>
  <div class="container-wrap" :style="`background-position:${backgroundPos.left}px ${backgroundPos.top}px`">
    <div ref="containerRef" class="blur-layer" >
    <div class="color-layer">

    </div>
    </div>
    <div class="content">
      {{info}}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, SetupContext, reactive, onMounted, ref } from 'vue'
type IContext = {

} & SetupContext

export default defineComponent({
  props: {
    config: {
      type: Object
    }
  },
  // :style="`background-position:top ${backgroundPos.top}px left ${backgroundPos.left}px`"
  setup (_, _ctx) {
    const ctx = _ctx as IContext
    const containerPos = reactive({ top: 0, left: 0 })
    const backgroundPos = reactive({ top: 0, left: 0 })
    const containerRef = ref<HTMLDivElement|null>(null)
    const info = ref('')
    const flushPos = (top: number, left: number) => {
      backgroundPos.top = containerPos.top + top
      backgroundPos.left = containerPos.left + left
      info.value = `top:${-backgroundPos.top.toFixed(2)}; left:${-backgroundPos.left.toFixed(2)}`
    }
    onMounted(() => {
      const dom = containerRef.value
      if (dom) {
        const rect = dom.getBoundingClientRect()
        containerPos.top = -rect.top
        containerPos.left = -rect.left
        flushPos(0, 0)
      }
    })
    return {
      backgroundPos,
      containerRef,
      flushPos,
      info
    }
  }
})
</script>
<style lang="scss" scoped>
.container-wrap {
  position: relative;
  min-width: 256px;
  min-height: 256px;
  background: inherit;
  overflow: hidden;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #1890ff;
  }

  .blur-layer {
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(5px);
    * {
      width: inherit;
      height: inherit;
    }
    .color-layer {
      background: rgba(255, 255, 255, 0.6);
    }
  }
  .content {
    padding: 16px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    word-break: break-all;
  }
}
</style>
