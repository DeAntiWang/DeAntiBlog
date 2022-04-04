import { debounceWait } from 'configs/options';

type debounceFunction = (...args: any[]) => void;
export const debounce = (
  fn: debounceFunction,
  wait = debounceWait,
): debounceFunction => {
  let timeout: NodeJS.Timeout = null;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(fn.bind(undefined, ...args), wait);
  };
}

export type { debounceFunction };
