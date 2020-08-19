<template>
  <div class="block">
    <slot></slot>
    <!--svg
      class="light-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="gradient-svg">
          <stop offset="10%" stop-color="white" />
          <stop offset="95%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle fill="url(#gradient-svg)" cx="64" cy="64" r="64" />
    </svg-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const useSvg = () => {
  const svgRect = ref({ width: 200, height: 200 })
  return {
    svgRect
  }
}
export default defineComponent({
  setup () {
    const { svgRect } = useSvg()
    return {
      svgRect
    }
  }
})
</script>

<style lang="scss" scoped>
.block {
  position: relative;
  background-image: radial-gradient(white, rgba(0, 0, 0, 0));
  background-size: 64px;
  background-repeat: no-repeat;
  .light-svg {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 128px;
    height: 128px;
    top: 0;
    left: 0;
  }
}
</style>
