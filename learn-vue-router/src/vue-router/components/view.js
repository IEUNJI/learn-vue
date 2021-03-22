export default {
  functional: true,
  render(h, context) {
    let parent = context.parent;
    let data = context.data;

    let route = parent.$route;
    let matched = route.matched;
    data.routerView = true; // 当前组件是一个 routerView
    let depth = 0;

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    let record = matched[depth];

    if (!record) {
      return h();
    }

    let component = record.component;
    console.log(depth, context);
    return h(component, data);
  }
};
