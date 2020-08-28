import { reactive } from 'vue'

export const sharedState = reactive({
  darkMode: true,
  idPool: {
    window: [] as number[],
    'block-container': [] as number[]
  }
})
