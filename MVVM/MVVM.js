class Dep {
  constructor() {
    this.subs = []; // 存放所有的watcher
  }

  // 订阅
  addSub(watcher) { // 添加watcher
    this.subs.push(watcher);
  }

  // 发布
  notify() {
    this.subs.forEach(watcher => {
      watcher.update();
    });
  }
}

// 观察者
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    // 默认先存放一个老值
    this.oldValue = this.get();
  }

  get() {
    let value = CompileUtil.getVal(this.vm, this.expr);
    return value;
  }

  update() { // 数据变化后，会调用观察者的update方法
    let newVal = CompileUtil.getVal(this.vm, this.expr);
    if (newVal !== this.oldValue) {
      // 这里用不用更新this.oldValue呢？？？
      this.cb(newVal);
    }
  }
}

class Observer { // 实现数据劫持
  constructor(data) {
    this.observer(data);
  }

  observer(data) {
    // 如果是对象才观察
    if (data && typeof data === 'object') {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }

  defineReactive(obj, key, value) {
    this.observer(value);
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set: (newVal) => {
        if (newVal !== value) {
          this.observer(newVal);
          value = newVal;
        }
      }
    });
  }
}

class Compiler {
  constructor(el, vm) {
    // 判断el属性是不是一个元素，不是元素就获取
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    // 把当前节点中的元素 获取到 放到内存中
    let fragment = this.node2fragment(this.el);

    // 把节点中的内容进行替换 用数据编译模板
    this.compile(fragment);
    // 把内容塞到页面中
    this.el.appendChild(fragment);

  }

  isDirective(attrName) {
    return attrName.startsWith('v-');
  }

  // 编译元素的
  compileElement(node) {
    let attributes = [...node.attributes];
    attributes.forEach(attr => {
      let { name, value: expr } = attr;
      if (this.isDirective(name)) {
        let [, directive] = name.split('-');
        // 需要调用不同的指令来处理
        CompileUtil[directive](node, expr, this.vm);
      }
    });
  }

  // 编译文本的
  compileText(node) {
    // 判断文本节点中的内容是否有小胡子语法
    let content = node.textContent;
    // 找到所有带小胡子语法的文本，?是不要贪婪匹配
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm);
    }
  }

  // 用来编译内存中的DOM节点
  compile(node) {
    let childNodes = [...node.childNodes];
    childNodes.forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
        // 如果是元素的话，需要把自己传进去，再去遍历子节点
        this.compile(child);
      } else {
        this.compileText(child);
      }
    });
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }

  node2fragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while (firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
}

let CompileUtil = {
  // node 是节点 expr是表达式 vm是当前实例
  model(node, expr, vm) {
    let fn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newVal) => { // 输入框是一个观察者
      console.log('watcher 传入的与获取的', newVal, this.getVal(vm, expr));
      fn(node, newVal);
    });
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  html() {

  },
  text(node, expr, vm) {
    let fn = this.updater['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], (newVal) => {
        console.log('watcher 传入的与获取的', newVal, this.getVal(vm, args[1]));
        fn(node, newVal);
      });
      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },
  getContentValue() {
    
  },
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater() {

    },
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
};

// 基类
class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;

    // 根元素存在 编译模板
    if (this.$el) {

      // 把数据全部转化成Object.defineProperty来定义
      new Observer(this.$data);

      console.log(this.$data);

      // 编译
      new Compiler(this.$el, this);
    }
  }
}
