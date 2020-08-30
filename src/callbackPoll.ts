export type eventType = 'mousemove'
export type fnType = (e: MouseEvent) => void
const eventPool = new Map<eventType, Array<fnType>>()
export const addCallBack = (event: eventType, cb: fnType) => {
  const quene = eventPool.get(event)
  if (quene) {
    quene.push(cb)
  } else {
    eventPool.set(event, [cb])
  }
}

export const getCallBackQuene = (event: eventType) => {
  return eventPool.get(event) || []
}
