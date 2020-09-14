<template>
  <div class="aside-manage-bar">
    <block-container>
      <ul class="windows-list" ref="windowsListRef">
        <li>
          <div class="profile" @click="autoLayout">自动布局</div>
        </li>
        <li v-for="window in windows" :key="window.id">
          <block>
            <div class="profile" @click="pullWindow(window)">{{window.name}}</div>
          </block>
        </li>
      </ul>
    </block-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, onMounted, inject } from 'vue'
import { windowState, incrMaxZindex } from './window'
import { ContainersState, useAutoLayout } from './window-container'

export default defineComponent({
  name: 'window-container-sidebar',
  props: {
    containerState: {
      default: () => {
        return {} as ContainersState
      }
    }
  },
  setup (props) {
    const windows = ref(new Array<windowState>())
    const windowsListRef = ref<HTMLUListElement>()
    const blockRect = reactive({ width: 0, height: 0 })
    provide('window-size', blockRect)
    onMounted(() => {
      windows.value = inject<windowState[]>('windows', [])
      const updateWindowSize = () => {
        const rect = windowsListRef.value?.getBoundingClientRect()!
        if (!rect || (rect && rect.height === 0)) {
          return setTimeout(updateWindowSize, 300)
        }
        blockRect.width = rect.width + 32 // windows有padding32
        blockRect.height = rect.height + 32
      }
      updateWindowSize()
    })
    const pullWindow = (win: windowState) => {
      win.zIndex = incrMaxZindex()
    }
    const autoLayout = () => {
      useAutoLayout(props.containerState)
    }
    return {
      windows,
      windowsListRef,
      pullWindow,
      autoLayout
    }
  }
})
</script>
<style lang="scss" scoped>
.aside-manage-bar {
  position: fixed;
  right: 0;
  border-radius: 4px;
  height: 60vh;
  top: 20vh;
  .windows-list {
    min-width: 128px;
    list-style: none;
    padding: 0;
    margin: 0;
    .profile {
      cursor: pointer;
      padding: 8px;
    }
  }
}
</style>
