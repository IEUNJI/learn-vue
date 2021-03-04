let Vue;

function install(_Vue) {
  Vue = _Vue;

  // 每个组件都会调用
  Vue.mixin({
    beforeCreate() {
      // 拿到store，给每个组件都增加$store属性
      // 没有将$store放到原型上，而是放到了每个vue组件实例上，因为有可能构造多个Vue实例

      if (this.$options.store) { // 根组件
        this.$store = this.$options.store;
        // console.log('根组件', this);
      } else if (this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store;
        // console.log('组件', this);
      } else {
        // console.log('其他组件', this);
      }
    }
  });
}

class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }

  register(path, rootModule) {
    const module = {
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    };

    if (path.length === 0) {
      this.root = module;
    } else {
      const parent = path.slice(0, -1).reduce((root, key) => {
        return root._children[key];
      }, this.root);
      parent._children[path[path.length - 1]] = module;
    }

    if (rootModule.modules) {
      Object.keys(rootModule.modules).forEach(key => {
        this.register(path.concat(key), rootModule.modules[key]);
      });
    }
  }
}

function installModule(store, rootState, path, rootModule) {
  if (path.length > 0) {
    const parent = path.slice(0, -1).reduce((root, key) => {
      return root[key];
    }, rootState);
    Vue.set(parent, path[path.length - 1], rootModule.state);
  }

  const getters = rootModule._rawModule.getters;
  if (getters) {
    Object.keys(getters).forEach(key => {
      Object.defineProperty(store.getters, key, {
        get: () => {
          return getters[key].call(undefined, rootModule.state);
        }
      });
    });
  }

  const mutations = rootModule._rawModule.mutations;
  if (mutations) {
    Object.keys(mutations).forEach(key => {
      const mfns = store.mutations[key] || [];
      mfns.push(payload => {
        mutations[key].call(store, rootModule.state, payload);
        store._subscribers.forEach(fn => {
          fn.call(undefined, { type: key, payload }, rootState);
        });
      });
      store.mutations[key] = mfns;
    });
  }

  const actions = rootModule._rawModule.actions;
  if (actions) {
    Object.keys(actions).forEach(key => {
      const afns = store.actions[key] || [];
      afns.push(payload => {
        actions[key].call(store, store, payload);
      });
      store.actions[key] = afns;
    });
  }

  const modules = rootModule._children;
  Object.keys(modules).forEach(key => {
    const module = modules[key];
    installModule(store, rootState, path.concat(key), module);
  });
}

class Store {
  constructor(options = {}) {
    this._s = new Vue({
      data() {
        return {
          state: options.state
        };
      }
    });
    this._subscribers = [];
    this.getters = {};
    this.mutations = {};
    this.actions = {};
    this._modules = new ModuleCollection(options);
    console.log(this._modules);
    installModule(this, this.state, [], this._modules.root);

    if (options.plugins) {
      options.plugins.forEach(plugin => {
        plugin.call(undefined, this);
      });
    }
  }

  subscribe = fn => {
    this._subscribers.push(fn);
  }

  commit = (mutationName, payload) => {
    const mfns = this.mutations[mutationName] || [];
    mfns.forEach(fn => {
      fn(payload);
    });
  }

  dispatch = (actionName, payload) => {
    const afns = this.actions[actionName] || [];
    afns.forEach(fn => {
      fn(payload);
    });
  }

  get state() {
    return this._s.state;
  }
}

export default {
  install,
  Store
};
