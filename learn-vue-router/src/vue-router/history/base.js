export function createRoute(record, location) {
  let res = [];

  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }

  return {
    ...location,
    matched: res
  };
};

export default class History {
  constructor(router) {
    this.router = router;
    // 默认路由中保存一个当前的路径，后续会更改这个路径
    this.current = createRoute(null, {
      path: '/'
    });
  }

  transitionTo(location, onComplete) {
    let route = this.router.match(location);
    console.log(route);
    if (this.current.path === route.path && this.current.matched.length === route.matched.length) {
      return;
    }
    this.updateRoute(route);
    onComplete && onComplete();
  }

  updateRoute(route) {
    this.current = route;
    this.cb && this.cb(route);
  }

  listen(cb) {
    this.cb = cb;
  }
};
