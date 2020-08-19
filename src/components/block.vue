<template>
  <div class="block"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.block {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid white;
  margin: 2px;
  line-height: 24px;
  text-align: center;
}
</style>
