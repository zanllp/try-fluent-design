<template>
  <div class="block-container">
    <slot></slot>
    <div class="svg-container">

    </div>
    <svg class="svg-mask">
      <defs>
        <radialGradient id="gradient-svg">
          <stop offset="10%" stop-color="white" />
          <stop offset="95%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle fill="url(#gradient-svg)" cx="64" cy="64" r="64" />
    </svg>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, onMounted, VNode, provide, inject, watch } from 'vue'
import { debounce } from 'lodash'
const useSvg = () => {
  const svgRect = ref({ width: 200, height: 200 })
  return {
    svgRect
  }
}
export default defineComponent({
  setup (_, ctx) {
    const { svgRect } = useSvg()
    type BlockState = {
      value: string;
      rect: {
        height: number;
        width: number;
      };
    }
    const blocks = new Array<BlockState>()
    const layout = ref(new Array<Array<BlockState>>())
    provide('regist-block', (state: BlockState) => blocks.push(state))
    onMounted(() => {
      type Size = BlockState['rect']
      const windowSize = inject<Size>('window-size')
      if (windowSize) {
        const reLayout = (val: Size) => {
          layout.value = blocks.reduce<Array<Array<BlockState>>>((p, c) => {
            const rowLine = p.length - 1
            // 8是2px边框和外边距，32是16px内填充
            const currLength = p[rowLine].reduce((p, c) => p + c.rect.width + 8, 0) // 最后一行的宽度
            if (currLength + c.rect.width + 8 > val.width - 32) { // 塞不下，换新的一行
              return [...p, [c]]
            }
            p[rowLine].push(c)
            return p
          }, [[]])
        }
        const e = <svg></svg>
        watch(() => windowSize, debounce(reLayout, 300), {
          deep: true,
          immediate: true
        })
      }
    })
    return {
      svgRect,
      layout
    }
  }
})
</script>

<style lang="scss" scoped>
.block-container {
  position: relative;
  background-image: radial-gradient(white, rgba(0, 0, 0, 0));
  background-size: 64px;
  background-repeat: no-repeat;
  .svg-mask {
    width: 0;
    height: 0;
    overflow: hidden;
  }
}
</style>
