import store from '@/store/store';
import * as types from '@/store/actions-type';

// 跟路由相关的钩子

export default {
  cancelToken(to, from, next) {
    store.commit(types.CLEAR_TOKEN);
    next();
  },
  permission(to, from, next) {
    // 如果没登录，访问课程页面，跳转至登录页
    // 在页面切换的时候 需要拿到当前状态是否登录

    if (!store.state.hasPermission) { // 没登录
      const needLogin = to.matched.some(route => route.meta.needLogin);
      if (needLogin) { // 需要登录
        store.dispatch(types.VALIDATE).then(data => {
          // 本地的token有效，登录成功，放行
          next();
        }).catch(e => {
          next('/login'); // 本地的token失效，跳去登录页
        });
      } else { // 不需要登录，放行
        if (to.name === 'login') { // 输入url方式访问登录页，此时判断本地token
          store.dispatch(types.VALIDATE).then(data => {
            // 本地的token有效，登录成功，放行到首页
            next('/profile');
          }).catch(e => {
            next(); // 留在登录页
          });
        } else {
          next();
        }
      }
    } else { // 登录了
      if (to.name === 'login') { // 登录了就不要访问登录页了（路由方式访问）
        next(from);
      } else {
        next();
      }
    }
  },
};
