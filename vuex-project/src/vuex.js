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
        console.log('根组件', this);
      } else if (this.$parent && this.$parent.$store) {
        this.$store = this.$parent.$store;
        console.log('组件', this);
      } else {
        console.log('其他组件', this);
      }
    }
  });
}

class Store {
  constructor(options = {}) {
    this._state = new Vue({
      data() {
        return {
          state: options.state
        };
      }
    });

    const getters = options.getters;
    this.getters = {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key].call(undefined, this.state);
        }
      });
    });

    const mutations = options.mutations;
    this.mutations = {};
    Object.keys(mutations).forEach(key => {
      this.mutations[key] = payload => {
        mutations[key].call(this, this.state, payload);
      };
    });

    const actions = options.actions;
    this.actions = {};
    Object.keys(actions).forEach(key => {
      this.actions[key] = payload => {
        actions[key].call(this, this, payload);
      };
    });
  }

  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload);
  }

  dispatch = (actionName, payload) => {
    this.actions[actionName](payload);
  }

  get state() {
    return this._state.state;
  }
}

export default {
  install,
  Store
};
