import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';

export default class VueRouter {
  constructor(options) {
    // match 负责匹配路径
    // addRoutes 动态添加路由
    this.matcher = createMatcher(options.routes || []);
    // 根据模式来创建不同的路由对象
    this.mode = options.mode || 'hash';
    this.history = new HashHistory(this);
  }

  init(app) {
    // 先根据当前路径显示到指定的组件
    // 后续要监听路径变化
    let history = this.history;
    let setupHashListener = () => {
      history.setupHashListener();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener);

    history.listen(route => {
      app._route = route; // 视图就可以刷新
    });
  }

  match(location) {
    return this.matcher.match(location);
  }

  push() {

  }

  replace() {

  }
};

VueRouter.install = install;
