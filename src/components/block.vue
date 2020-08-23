<template>
  <div class="block" :style="style"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, inject, computed } from 'vue'

export default defineComponent({
  name: 'block',
  props: {
    value: {
      type: String
    },
    rectInit: {
      default: () => ({
        width: 24,
        height: 24
      })
    }
  },
  setup (props) {
    const rect = reactive(props.rectInit)
    const style = computed(() => `width:${rect.width}px;height:${rect.height}px;`)
    onMounted(() => {
      const regist = inject<(state: any) => void>('regist-block')
      regist && regist({ rect, value: props.value })
    })
    return {
      rect,
      style
    }
  }
})
</script>

<style lang="scss" scoped>
.block {
  display: inline-block;
  border: 2px solid white;
  margin: 2px;
  line-height: 24px;
  text-align: center;
}
</style>
