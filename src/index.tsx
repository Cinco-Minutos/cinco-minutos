import React from 'react';
import App from './App';
import { render } from 'react-dom';
import './polyfill';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/sw.ts');
}

render(<App />, document.getElementById('root'));
