export function render(vnode, container) {
  let ele = createDomElementFromVnode(vnode);

  container.appendChild(ele);
};

function createDomElementFromVnode(vnode) {
  console.log(vnode);
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
