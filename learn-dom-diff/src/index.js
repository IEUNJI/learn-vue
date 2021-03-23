import { h, render, patch } from './vdom/index.js';

let oldVnode = h('ul', {},
  h('li', { style: { background: 'red' }, key: 'A' }, 'A'),
  h('li', { style: { background: 'yellow' }, key: 'B' }, 'B'),
  h('li', { style: { background: 'blue' }, key: 'C' }, 'C'),
  h('li', { style: { background: 'green' }, key: 'D' }, 'D')
);

render(oldVnode, document.getElementById('app'));

let newVnode = h('ul', {},
h('li', { style: { background: 'pink' }, key: 'E' }, 'E'),
  h('li', { style: { background: 'red' }, key: 'A', id: 'a' }, 'A'),
  h('li', { style: { background: 'yellow' }, key: 'B' }, 'B'),
  h('li', { style: { background: 'blue' }, key: 'C' }, 'C'),
  h('li', { style: { background: 'green' }, key: 'D' }, 'D'),
);

setTimeout(() => {
  patch(oldVnode, newVnode);
}, 2000);
