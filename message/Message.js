import MessageComponent from './Message.vue';
import Vue from 'vue';

let instance;
function getVueInstance() {
  instance = new Vue({
    render(h) {
      return h(MessageComponent);
    }
  }).$mount();
  document.body.appendChild(instance.$el);
}

const Message = {
  success(options) {
    if (!instance) {
      getVueInstance();
    }
    instance.$children[0].add(options);
  }
};

export {
  Message
}

export default {
  install(_Vue) {
    _Vue.prototype.$message = Message;
  }
}
