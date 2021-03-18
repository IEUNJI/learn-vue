import store from '@/store/store';
import * as types from '@/store/actions-type';
import auth from './auth';

// 跟路由相关的钩子

export default {
  cancelToken(to, from, next) {
    store.commit(types.CLEAR_TOKEN);
    next();
  },
  permission(to, from, next) {
    // 如果没登录，访问课程页面，跳转至登录页
    // 在页面切换的时候 需要拿到当前状态是否登录

    if (!store.state.hasPermission) { // 没登录（或者刷新的时候）
      // 总是判断token是否失效
      store.dispatch(types.VALIDATE).then(() => {
        // token有效，登录了，放行
        if (to.name === 'login') { // 登录了就不要再访问登录页了
          next('/profile');
        } else {
          next();
        }
      }).catch(() => { // 失效
        const needLogin = to.matched.some(route => route.meta.needLogin);
        if (needLogin) { // 失效未登录就跳去登录页
          next('/login');
        } else { // 其他情况放行
          next();
        }
      });
    } else { // 登录了
      if (to.name === 'login') { // 登录了就不要访问登录页了（路由方式访问）
        next(from);
      } else {
        console.log('登录了判断');
        next();
      }
    }
  },
  profileAuth(to, from, next) {
    console.log('to.name', to, to.name, store.state.hasPermission);
    // 因为上一个登录钩子执行了next，才走下一个钩子，所以这里即使刷新也是true
    if (store.state.hasPermission) {
      if (!store.state.menuPermission) { // 没设置过菜单权限
        const authList = store.state.user.menuList.map(i => i.auth);
        const newRoutes = auth.filter(route => {
          return authList.includes(route.name);
        });
        this.addRoutes(newRoutes);
        store.commit(types.SET_MENU_LIST);
        console.log('不存在菜单的跳转');
        next({...to, replace: true}); // 重新走一遍，这样在动态路由页面刷新也可以访问到
        return;
      }
    }
    console.log('存在菜单的跳转');
    next();
  },
};
