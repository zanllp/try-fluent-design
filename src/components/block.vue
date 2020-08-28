<template>
  <div class="block" ref="domRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
    const rect = ref<DOMRect | null>(null)
    let ro: ResizeObserver
    const blockId = ref<number>()
    const unmountedBlock = inject<(id: number) => void>('unmounted-block')
    const regist = inject<(state: AnyBlockState) => number>('regist-any-block')
    const updateState = inject<(state: AnyBlockState) => number>('update-block-state')
    const onWillUpdateRect = inject<(cb: () => void, id: number) => void>('on-will-update-rect')
    onMounted(() => {
      const dom = domRef.value
      if (!dom) {
        throw new Error('任意形状块获取dom失败!!!')
      }
      if (!(regist && updateState && onWillUpdateRect)) {
        throw new Error('block组件必须在block-container组件的包裹下')
      }
      ro = new ResizeObserver(entries => {
        rect.value = entries[0].target.getBoundingClientRect()
        updateState({ value: props.value, rect: rect.value, id: blockId.value || -1 })
      })
      ro.observe(dom)
      blockId.value = regist({ value: props.value, rect: rect.value, id: -1 })
      onWillUpdateRect(() => {
        rect.value = dom.getBoundingClientRect()
        updateState({ value: props.value, rect: rect.value, id: blockId.value! })
      }, blockId.value)
    })
    onUnmounted(() => {
      const dom = domRef.value
      if (dom && ro) {
        ro.disconnect()
      }
      unmountedBlock && unmountedBlock(blockId.value!)
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
}
</style>
