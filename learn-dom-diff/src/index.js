import { h, render } from './vdom/index.js';

let vnode = h('div', { id: 'wrapper', a: 1, key: 'abc', style: { color: 'blue' } }, h('span', { style: { color: 'red' } }, 'hello'), 'vdom', h('p', null, 'tag p'));

render(vnode, document.getElementById('app'));
