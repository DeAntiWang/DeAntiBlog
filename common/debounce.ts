import { debounceWait } from '../configs/options';

export default function debounce(fn: Function, wait = debounceWait) {
  if(wait===null) {
    wait = debounceWait;
  }

  let timeout: NodeJS.Timeout = null;
  return function (args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(args);
    }, wait)
  }
}