<template>
  <div class="aside-manage-bar">
    <ul class="windows-list" ref="windowsListRef">
      <li class="profile auto-layout"  @click="autoLayout">
        <div>平铺所有窗口</div>
      </li>
      <li v-for="window in windows" :key="window.id" class="profile">
        <div @click="pullWindow(window)">{{window.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, onMounted, inject } from 'vue'
import { windowState, incrMaxZindex } from './window'
import { ContainersState, useAutoLayout } from './window-container'
import { customPropsType } from '../util'

export default defineComponent({
  name: 'window-container-sidebar',
  props: {
    containerState: customPropsType<ContainersState>()
  },
  setup (props) {
    const windows = ref(new Array<windowState>())
    const windowsListRef = ref<HTMLUListElement>()
    const blockRect = reactive({ width: 0, height: 0 })
    provide('window-size', blockRect)
    onMounted(() => {
      windows.value = inject<windowState[]>('windows', [])
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
  user-select: none;
  color: white;
  position: fixed;
  right: 0;
  border-radius: 4px;
  height: 60vh;
  top: 20vh;
  z-index: 233;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  background: rgba(63, 63, 63, 0.555);
  .windows-list {
    position: relative;
    height: 100%;
    overflow: auto;
    min-width: 128px;
    list-style: none;
    padding: 0;
    margin: 0;
    .auto-layout {
      position: sticky;
      top: -1px;
      background: rgba(0, 0, 0, 0.74);
    }
    .profile {
      cursor: pointer;
      padding: 16px;
      &:hover {
        background: rgba(102, 102, 102, 0.74);
      }
    }
  }
}
</style>
