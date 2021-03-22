// 14分钟
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
  constructor(vm, expr, cb, node) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.node = node;

    // 默认先存放一个老值
    this.oldValue = this.get();
  }

  get() {
    Dep.target = this;
    let value = CompileUtil.getVal(this.vm, this.expr);
    Dep.target = null; // 在取值结束后清除watcher
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

    let dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 创建watcher时，会收取到对应的内容，并把watcher放到全局上
        if (Dep.target) {
          dep.addSub(Dep.target);
          // Dep.target = null; // 不能在这里取消，比如school.name其实应该把watcher放到school和name两个dep里
          // 在这里取消就只会存在school里，name被清掉了就取不到了
        }
        return value;
      },
      set: (newVal) => {
        if (newVal !== value) {
          console.log('set');
          this.observer(newVal);
          value = newVal;
          dep.notify();
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
        let [directiveName, eventName] = directive.split(':');
        // 需要调用不同的指令来处理
        CompileUtil[directiveName](node, expr, this.vm, eventName);
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
  // 需要绑定事件
  model(node, expr, vm) {
    let fn = this.updater['modelUpdater'];
    new Watcher(vm, expr, (newVal) => { // 输入框是一个观察者
      fn(node, newVal);
    }, node);
    node.addEventListener('input', e => {
      let inpVal = e.target.value; // 用户输入的值
      this.setValue(vm, expr, inpVal);
    });
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  on(node, expr, vm, eventName) { // v-on:click="change"
    node.addEventListener(eventName, (e) => {
      vm[expr].call(vm, e);
    })
  },
  html(node, expr, vm) {
    let fn = this.updater['htmlUpdater'];
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal);
    }, node);
    let value = this.getVal(vm, expr);
    fn(node, value);
  },
  text(node, expr, vm) {
    let fn = this.updater['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      new Watcher(vm, args[1], (newVal) => {
        fn(node, this.getContentValue(vm, expr));
      }, node);
      return this.getVal(vm, args[1]);
    });
    fn(node, content);
  },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(vm, args[1]);
    });
  },
  getVal(vm, expr) {
    return expr.split('.').reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    expr.split('.').reduce((data, current, index, arr) => {
      if (index === arr.length - 1) {
        data[current] = value;
      }
      return data[current];
    }, vm.$data);
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
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
    let computed = options.computed;
    let methods = options.methods;
    console.log(computed);

    // 根元素存在 编译模板
    if (this.$el) {

      // 把数据全部转化成Object.defineProperty来定义
      new Observer(this.$data);

      console.log(this.$data);

      // 把vm上的取值操作都代理到vm.$data上
      this.proxyVm(this.$data);

      for (let key in computed) {
        Object.defineProperty(this.$data, key, {
          get: () => {
            return computed[key].call(this);
          }
        });
      }

      for (let key in methods) {
        Object.defineProperty(this, key, {
          get: () => {
            return methods[key];
          }
        });
      }

      // 编译
      new Compiler(this.$el, this);
    }
  }

  proxyVm(data) {
    for (let key in data) {
      // 取值代理
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(val) {
          data[key] = val;
        }
      });
    }
  }
}
