let Vue;

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        this.$store = this.$options.store;
      } else if (this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store;
      }
    }
  });
}

class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }

  register(path, rawModule) {
    const module = {
      state: rawModule.state,
      _rawModule: rawModule,
      _children: {}
    };

    if (path.length === 0) {
      this.root = module;
    } else {
      const parent = path.slice(0, -1).reduce((root, key) => {
        return root._children[key];
      }, this.root);
      parent._children[path[path.length - 1]] = module;
    }

    if (rawModule.modules) {
      Object.keys(rawModule.modules).forEach(key => {
        this.register(path.concat(key), rawModule.modules[key]);
      });
    }
  }
}

function installModule(store, rootState, path, module) {
  if (path.length > 0) {
    const parent = path.slice(0, -1).reduce((root, key) => {
      return root[key];
    }, rootState);
    Vue.set(parent, path[path.length - 1], module.state);
  }

  const getters = module._rawModule.getters;
  if (getters) {
    Object.keys(getters).forEach(key => {
      Object.defineProperty(store.getters, key, {
        get: () => {
          return getters[key].call(undefined, module.state, store.getters, rootState);
        }
      });
    });
  }

  const mutations = module._rawModule.mutations;
  if (mutations) {
    Object.keys(mutations).forEach(key => {
      const callbacks = store._mutations[key] || [];
      callbacks.push(payload => {
        mutations[key].call(store, module.state, payload);
        store._subscribers.forEach(sub => {
          sub.call(undefined, { type: key, payload }, rootState);
        });
      });
      store._mutations[key] = callbacks;
    });
  }

  const actions = module._rawModule.actions;
  if (actions) {
    Object.keys(actions).forEach(key => {
      const callbacks = store._actions[key] || [];
      callbacks.push(payload => {
        actions[key].call(store, store, payload);
      });
      store._actions[key] = callbacks;
    });
  }

  const modules = module._children;
  Object.keys(modules).forEach(key => {
    installModule(store, rootState, path.concat(key), modules[key]);
  });
}

class Store {
  constructor(options = {}) {
    this._vm = new Vue({
      data() {
        return {
          $$state: options.state
        };
      }
    });
    this.getters = {};
    this._mutations = {};
    this._actions = {};
    this._subscribers = [];
    this._modules = new ModuleCollection(options);

    installModule(this, this.state, [], this._modules.root);

    if (options.plugins) {
      options.plugins.forEach(plugin => {
        plugin.call(undefined, this);
      });
    }
  }

  get state() {
    return this._vm.$data.$$state;
  }

  commit = (mutationName, payload) => {
    const callbacks = this._mutations[mutationName] || [];
    callbacks.forEach(cb => {
      cb(payload);
    });
  }

  dispatch = (actionName, payload) => {
    const callbacks = this._actions[actionName] || [];
    callbacks.forEach(cb => {
      cb(payload);
    });
  }

  subscribe = sub => {
    this._subscribers.push(sub);
  }
}

export default {
  install,
  Store
};
