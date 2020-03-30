import { debounceWait } from '../config/options';

export default function debounce(fn, wait = debounceWait) {
  if(wait===null) {
    wait = debounceWait;
  }

  let timeout = null;
  return function (args) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(args);
    }, wait)
  }
}