import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import 'setimmediate';

// Following just for compatibility
declare const Promise: PromiseConstructor & {
  _immediateFn?: typeof setImmediate;
};
Promise._immediateFn = setImmediate;
