import { useState } from 'react';
const globalState: {[k: string]: unknown} = JSON.parse(localStorage.getItem('globalState') || '{}');

const persistGlobalState = () => localStorage.setItem('globalState', JSON.stringify(globalState));
window.addEventListener('beforeunload', persistGlobalState);

type GlobalSetState<T> = (val: T) => void;
type GlobalStateHook<T> = () => [T, GlobalSetState<T>];
const createGlobalStateHook = <T>(name: string, defaultValue: T): GlobalStateHook<T> => {
  const updateStateFor = new Set<GlobalSetState<T>>();
  let selectedState: T = globalState[name] as T;
  if (typeof selectedState === 'undefined')
    globalState[name] = selectedState = defaultValue;
  return () => {
    const [state, setState] = useState(selectedState);
    updateStateFor.add(setState);
    return [
      state,
      val => {
        globalState[name] = val;
        updateStateFor.delete(setState);
        for (const f of updateStateFor)
        {
          updateStateFor.delete(f);
          f(val);
        }
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