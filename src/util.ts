import { sharedState } from './store';

export const num2color = (c: number) => {
  const r = c >> 16;
  const g = (c >> 8) & 0xff;
  const b = c & 0xff;
  return [r, g, b];
};
export type BlockState = {
  value?: string;
  rect: {
    height: number;
    width: number;
  };
};
export type Size = BlockState['rect'];
export type AnyBlockState = {
  value?: string;
  rect: DOMRect | null;
  id: number;
};
/**
 * 共享状态里获取一个自增id
 */
export const getIncrementId = (type: keyof typeof sharedState.idPool) => {
  const arr = sharedState.idPool[type];
  const id = arr.length !== 0 ? arr[arr.length - 1] + 1 : 0;
  arr.push(id);
  return id;
};

export const createArray = <T>(num: number, createFn: (index: number) => T) => {
  return Array(num)
    .fill(null)
    .map((_, i) => createFn(i));
};
