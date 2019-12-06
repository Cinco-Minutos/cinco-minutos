import React from 'react';
import App from './App';
import { render } from 'react-dom';
import './polyfill';
import './index.css';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/sw.ts');
}

render(<App />, document.getElementById('root'));
