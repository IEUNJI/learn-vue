export function render(vnode, container) {
  let ele = createDomElementFromVnode(vnode);

  container.appendChild(ele);
};

function createDomElementFromVnode(vnode) {
  let { type, key, props, children, text } = vnode;

  if (type) { // 标签
    vnode.domElement = document.createElement(type); // 建立链接
    updateProperties(vnode); // 渲染属性
    children.forEach(childVnode => {
      render(childVnode, vnode.domElement);
    });
  } else { // 文本
    vnode.domElement = document.createTextNode(text);
  }

  return vnode.domElement;
}

function updateProperties(newVnode, oldProps) {
  oldProps = oldProps || {};
  let domElement = newVnode.domElement;
  let newProps = newVnode.props;

  for (let oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName];
    }
  }

  let newStyleObj = newProps.style || {};
  let oldStyleObj = oldProps.style || {};

  for (let oldPropName in oldStyleObj) {
    if (!newStyleObj[oldPropName]) {
      domElement.style[oldPropName] = '';
    }
  }

  for (let newPropName in newProps) {
    if (newPropName === 'style') {
      let styleObj = newProps.style;
      for (let s in styleObj) {
        domElement.style[s] = styleObj[s];
      }
    } else {
      domElement[newPropName] = newProps[newPropName];
    }
  }
}

export function patch(oldVnode, newVnode) {
  // 类型不同
  if (oldVnode.type !== newVnode.type) {
    oldVnode.domElement.parentNode.replaceChild(createDomElementFromVnode(newVnode), oldVnode.domElement);
    return;
  }

  // 类型相同 文本
  if (typeof oldVnode.type === 'undefined') {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.domElement.textContent = newVnode.text;
    }
    return;
  }

  // 类型相同 标签
  let domElement = newVnode.domElement = oldVnode.domElement;
  updateProperties(newVnode, oldVnode.props);

  let oldChildren = oldVnode.children;
  let newChildren = newVnode.children;

  if (oldChildren.length > 0 && newChildren.length > 0) { // 老的和新的都有儿子
    updateChildren(domElement, oldChildren, newChildren);
  } else if (oldChildren.length > 0) { // 老的有儿子，新的没儿子
    domElement.innerHTML = '';
  } else if (newChildren.length > 0) { // 老的没儿子，新的有儿子
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < newChildren.length; i++) {
      fragment.appendChild(createDomElementFromVnode(newChildren[i]));
    }
    domElement.appendChild(fragment);
    fragment = null;
  }
};

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
}

// diff
function updateChildren(parent, oldChildren, newChildren) {
  let oldStartIndex = 0;
  let oldStartVnode = oldChildren[oldStartIndex];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0;
  let newStartVnode = newChildren[newStartIndex];
  let newEndIndex = newChildren.length - 1;
  let newEndVnode = newChildren[newEndIndex];

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    }
  }

  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let beforeElement = typeof newChildren[newEndIndex + 1] === 'undefined' ? null : newChildren[newEndIndex + 1].domElement;
      parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement);
    }
  }
}
