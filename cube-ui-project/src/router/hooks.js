import store from '@/store/store';
import * as types from '@/store/actions-type';
import authRoutes from './auth';

// 跟路由相关的钩子

export default {
  cancelToken(to, from, next) {
    store.commit(types.CLEAR_TOKEN);
    next();
  },
  permission(to, from, next) {
    // hasPermission(vuex) 默认为 false
    if (!store.state.hasPermission) { // 未登录或手动刷新页面
      // 调用接口验证本地token
      store.dispatch(types.VALIDATE).then(() => { // 本地 token 有效
        if (to.name === 'login') { // 已登录访问登录页需要跳转至个人中心
          next('/profile');
        } else {
          next();
        }
      }).catch(() => { // 本地 token 失效
        const needLogin = to.matched.some(route => route.meta.needLogin); // 匹配路由及子路由
        if (needLogin) { // 需要登录才能访问
          next('/login');
        } else { // 不需要登录也可访问
          next();
        }
      });
    } else { // 已登录
      if (to.name === 'login') { // 已登录访问登录页需要跳转至个人中心
        next('/profile');
      } else {
        next();
      }
    }
  },
  menuPermission(to, from, next) {
    if (store.state.hasPermission) { // 用户需要处于登录状态
      if (!store.state.menuPermission) { // 用户没设置过菜单权限
        // 权限列表
        const authList = store.state.user.menuList.map(item => item.auth);
        // 动态路由
        const newRoutes = authRoutes.filter(route => authList.includes(route.name));
        this.addRoutes(newRoutes); // 注册动态路由
        store.commit(types.SET_MENU_LIST); // 将 menuPermission 置为 true
        next({ ...to, replace: true }); // hack 方法，解决在动态路由页面刷新时匹配到 404 页面的问题
        // 因为是刷新，所以 replace 为 true，只保存一次当前页的历史记录
        return;
      }
    }
    next();
  },
};
