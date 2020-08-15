export const num2color = (c: number) => {
  const r = c >> 16
  const g = (c >> 8) & 0xff
  const b = c & 0xff
  return [r, g, b]
}
