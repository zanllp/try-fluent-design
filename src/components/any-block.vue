<template>
  <div class="block" ref="domRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject, ref, onUnmounted } from 'vue'
import { AnyBlockState } from '@/util'

export default defineComponent({
  name: 'block',
  props: {
    value: {
      type: String
    }
  },
  setup (props) {
    const domRef = ref<HTMLElement>()
    const rect = ref<DOMRect|null>(null)
    let ro: ResizeObserver
    onMounted(() => {
      const regist = inject<(state: AnyBlockState) => void>('regist-any-block')
      const dom = domRef.value
      if (!dom) {
        throw new Error('任意形状块获取dom失败!!!')
      }
      ro = new ResizeObserver(entries => {
        rect.value = entries[0].contentRect
      })
      ro.observe(dom)
      regist && regist({ value: props.value, rect })
    })
    onUnmounted(() => {
      const dom = domRef.value
      if (dom && ro) {
        ro.disconnect()
      }
    })
    return {
      domRef
    }
  }
})
</script>

<style lang="scss" scoped>
.block-wrap {
  display: inline-block;
}
.block {
  display: inline-block;
  border: 2px solid transparent;
  margin: 2px;
  line-height: 24px;
  text-align: center;
  vertical-align: top;
}
</style>
