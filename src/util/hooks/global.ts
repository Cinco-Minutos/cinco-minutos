import { useState } from 'react';
const globalState: {[k: string]: unknown} = JSON.parse(localStorage.getItem('globalState') || '{}');

const persistGlobalState = () => localStorage.setItem('globalState', JSON.stringify(globalState));
window.addEventListener('beforeunload', persistGlobalState);

type GlobalStateHook<T> = () => [T, (val: T) => void];
const createGlobalStateHook = <T>(name: string, defaultValue: T): GlobalStateHook<T> => {
  let selectedState: T = globalState[name] as T;
  if (typeof selectedState === 'undefined')
    globalState[name] = selectedState = defaultValue;
  return () => {
    const [state, setState] = useState(selectedState);
    return [
      state,
      val => {
        globalState[name] = val;
        setState(val);
      }
    ];
  };
}
const useDarkMode = createGlobalStateHook<boolean>('darkMode', true);
export default {
  darkMode: useDarkMode
};
export { useDarkMode }