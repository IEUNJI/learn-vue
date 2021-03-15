import axios from 'axios';
import { Toast } from 'cube-ui';
import store from '@/store/store';
import * as types from '@/store/actions-type';

class ajaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/';
    this.timeout = 10000;
    this.toast = Toast.$create({
      txt: '正在加载',
      time: 0
    });
    this.queue = {};
  }

  setInterceptor(instance, url) {
    const showToast = () => {
      if (Object.keys(this.queue).length === 0) {
        this.toast = Toast.$create({
          txt: '正在加载',
          time: 0
        });
        this.toast.show();
      }
      this.queue[url] = url;
    };
    const hideToast = () => {
      delete this.queue[url];
      if (Object.keys(this.queue).length === 0) {
        this.toast.hide();
      }
    };

    instance.interceptors.request.use(config => {
      config.headers.token = localStorage.getItem('token') || '';

      config.cancelToken = new axios.CancelToken(c => {
        store.commit(types.PUSH_TOKEN, c);
      });

      showToast();
      return config;
    });

    instance.interceptors.response.use(res => {
      hideToast();
      if (res.data.code == 0) {
        return res.data.data;
      } else { // 业务错误
        return Promise.reject(res.data);
      }
    }, err => { // ajax 错误
      hideToast();
      console.log('捕获ajax错误，抛出', err);
      return Promise.reject(err);
    });
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout
    };
    this.setInterceptor(instance, options.url); // 给每个实例设置拦截器
    return instance(config);
  }
}

export default new ajaxRequest();
