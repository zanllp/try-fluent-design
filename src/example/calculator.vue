<template>
  <window name="计算器" :dark="false" :size="{ height: 384, width: 512 }">
    <reveal-container>
      <div class="temp-area">{{tempText}}</div>
      <div class="display-area">{{ displayText}}</div>
      <div>
        <reveal v-for="op in operators" :key="op" class="key-btn op-btn" @click="keydown(op)">{{op}}</reveal>
      </div>
      <div>
        <reveal v-for="key in numKeys" :key="key" class="key-btn" @click="keydown(key)">{{key}}</reveal>
      </div>
    </reveal-container>
  </window>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { createArray, resetArray } from '@/util'

export default defineComponent({
  setup () {
    const displayTextList = reactive<Array<string | number>>([0])
    const displayText = computed(() => displayTextList.join(''))
    const codeList = reactive(new Array<string | number>())
    const tempText = computed(() => codeList.join(''))
    const numKeys = reactive(createArray(10, i => i))
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
      const dl = displayTextList
      switch (code) {
        case 'c':
          resetArray(dl, 0)
          resetArray(codeList)
          break
        case '+':
        case '-':
        case '*':
        case '/':
          dl.push(code)
          codeList.push(code)
          break
        case 'ce':
          resetArray(dl, 0)
          break
        case '=':
          resetArray(dl, ...codeList, '=', calc())
          break
        case 'del':
          dl.pop()
          codeList.pop()
          break
        default:
          codeList.push(code)
          if (typeof dl[dl.length - 1] !== 'number') {
            resetArray(dl)
          }
          if (dl.length === 1 && dl[0] === 0) {
            dl.pop()
          }
          dl.push(code)
          break
      }
    }
    const operators = reactive(['+', '-', '*', '/', 'c', 'ce', '=', 'del'])
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
.op-btn {
  background: #d6d6d6;
}
</style>
