import store from '@/store/store';
import * as types from '@/store/actions-type';

// 跟路由相关的钩子

export default {
  cancelToken(to, from, next) {
    store.commit(types.CLEAR_TOKEN);
    next();
  },
  permission(to, from, next) {
    next();
  },
};
