/* eslint-disable vue/custom-event-name-casing */
<template>
  <div class="block-container" ref="selfRef" @scroll="onScroll" id="bg">
    <reveal-block
      v-for="block in blockConfig"
      :key="block.id"
      class="block"
      :config="block"
      :ref="block.ref"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, ComponentInternalInstance, onMounted } from 'vue'
import revealBlock from './components/reveal-block.vue'
const blockConfig = [{
  color: '#f5222d'
}, {
  color: '#fa541c'
}, {
  color: '#fa8c16'
}, {
  color: '#faad14'
}, {
  color: '#fadb14'
}, {
  color: '#a0d911'
}, {
  color: '#52c41a'
}, {
  color: '#13c2c2'
}, {
  color: '#1890ff'
}, {
  color: '#2f54eb'
}, {
  color: '#722ed1'
}, {
  color: '#eb2f96'
}].map((_, idx) => ({ ..._, id: idx, ref: ref<{ $emit(...args: any): void; flushPos(x: number, y: number): void } | null>(null) }))

export default defineComponent({
  name: 'App',
  components: {
    revealBlock
  },
  setup () {
    const selfRef = ref<HTMLDivElement | null>(null)
    const onScroll = () => {
      blockConfig.forEach(val => {
        const ref = val.ref.value
        const domSelf = selfRef.value
        if (ref && domSelf) {
          ref.flushPos(domSelf.scrollTop, domSelf.scrollLeft)
        }
      })
    }
    onMounted(() => {
      let i = 0
      const e = () => requestAnimationFrame((t) => {
        i += t / 10000
        if (i > 2000) {
          i = 0
        }
        blockConfig.forEach(val => {
          const ref = val.ref.value
          const domSelf = selfRef.value
          if (ref && domSelf) {
            ref.flushPos(i, 0)
          }
        })
        e()
      })
      // e()
    })
    const onMouseMove = (e: MouseEvent) => {
      console.info(`${e.x},${e.y}`)
    }
    return {
      blockConfig,
      onScroll,
      selfRef,
      onMouseMove
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
