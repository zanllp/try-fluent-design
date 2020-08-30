<template>
  <window name="计算器" :dark="false" :size="{ height: 400, width: 512 }">
    <block-container>
      <div class="temp-area">{{tempText}}</div>
      <div class="display-area">{{ displayText}}</div>
      <div>
        <block v-for="op in operators" :key="op" class="key-btn" @click="keydown(op)">{{op}}</block>
      </div>
      <div>
        <block
          v-for="key in numKeys"
          :key="key.code"
          class="key-btn"
          @click="keydown(key.code)"
        >{{key.code}}</block>
      </div>
    </block-container>
  </window>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { createArray } from '@/util'

export default defineComponent({
  setup () {
    const displayText = ref('0')
    const op = ref('')
    const lastRes = ref(0)
    const codeList = reactive(new Array<string | number>())
    const tempText = computed(() => codeList.join(' '))
    const numKeys = reactive(createArray(10, i => ({ code: i })))
    const clacMethodMap = (op: '+' | '-' | '*' | '/', l: number, r: number) => {
      switch (op) {
        case '+':
          return l + r
        case '-':
          return l - r
        case '*':
          return l * r
        case '/':
          return l / r
      }
    }
    const calc = () => {
      const readNum = () => {
        let n = codeList.shift()
        while (n && typeof codeList[0] === 'number') {
          n = `${n}${codeList.shift()}`
        }
        return Number(n)
      }
      let l = readNum()
      while (codeList.length && l !== undefined) {
        const op = codeList.shift()
        const r = readNum()
        l = clacMethodMap(op as any, l, r)
      }
      return l
    }
    const keydown = (code: number | string) => {
      const curr = displayText.value
      switch (code) {
        case 'c':
          displayText.value = '0'
          while (codeList.pop()) { }
          op.value = ''
          lastRes.value = 0
          break
        case '+':
        case '-':
        case '*':
        case '/':
          op.value = code
          displayText.value = curr + ' ' + code
          codeList.push(code)
          break
        case 'ce':
          displayText.value = '0'
          break
        case '=':
          displayText.value = [...codeList, '=', calc()].join(' ')
          while (codeList.pop()) {}
          break
        default:
          codeList.push(code)
          displayText.value = (curr === '0' ? '' : curr) + code
          break
      }
    }
    const operators = reactive(['+', '-', '*', '/', 'c', 'ce', '='])
    return {
      numKeys,
      displayText,
      keydown,
      operators,
      tempText
    }
  }
})
</script>

<style lang="scss" scoped>
.temp-area {
  line-height: 16px;
  color: #b5b5b5;
  padding: 4px;
  text-align: right;
}
.display-area {
  line-height: 32px;
  padding: 8px;
  text-align: right;
  font-weight: bold;
  font-size: 2em;
}
.key-btn {
  text-align: center;
  line-height: 48px;
  height: 48px;
  width: 72px;
  background: #f2f2f2;
  transition: 0.3s all;
  cursor: pointer;
  &:hover {
    background: #b5b5b5;
  }
}
</style>
