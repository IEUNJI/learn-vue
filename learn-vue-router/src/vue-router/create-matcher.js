import createRouteMap from './create-route-map';
import { createRoute } from './history/base';

export default function createMatcher(routes) {

  // 初始化配置
  let { pathList, pathMap } = createRouteMap(routes);

  function addRoutes(routes) {
    // 添加新的配置
    createRouteMap(routes, pathList, pathMap);
  }

  function match(location) {
    // 找到对应的记录，并根据记录产生一个匹配数组
    let record = pathMap[location];
    if (record) {
      return createRoute(record, {
        path: location
      });
    }
    return createRoute(null, {
      path: location
    });
  }

  return {
    match,
    addRoutes
  };
};
