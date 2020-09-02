<template>
  <window :init-pos="{ top: 512, left: 480 }" name="响应式24栏栅格">
    <block-container>
      <fd-row>
        <fd-col
          v-for="block in blocks"
          :key="block"
          :span="{ xs:6 , md:5, xl: 4 }"
          :offset="{ xs:0 , md: 1 , xl: 2 }"
        >
          <block :value="block">{{ block }}</block>
        </fd-col>
      </fd-row>
      <fd-row>
        <fd-col v-for="block in blocks" :key="block" :span="{ xs:8 , xl: 6 }">
          <block :value="block">{{ block }}</block>
        </fd-col>
      </fd-row>
      <fd-row>
        <fd-col span="4" offset="3">hello</fd-col>
        <fd-col span="4" offset="3">world</fd-col>
      </fd-row>
    </block-container>
  </window>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { createArray } from '@/util'
export default defineComponent({
  name: 'App',
  setup () {
    const blocks = reactive(createArray(6, idx => String.fromCharCode(65 + idx)))
    return {
      blocks
    }
  }
})
</script>
