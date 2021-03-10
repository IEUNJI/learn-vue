import axios from 'axios';
import { Toast } from 'cube-ui';

class ajaxRequest {
  constructor() {
    console.log(process.env.NODE_ENV);
    this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : '/';
    this.timeout = 3000;
    console.log(Toast);
    this.toast = Toast.$create({
      txt: '正在加载',
      time: 0
    });
    this.queue = {};
  }

  setInterceptor(instance, url) {
    const showToast = () => {
      if (Object.keys(this.queue).length === 0) {
        console.log('真的显示toast');
        this.toast.show();
      }
      this.queue[url] = url;
    };
    const hideToast = () => {
      delete this.queue[url];
      if (Object.keys(this.queue).length === 0) {
        console.log('真的关闭toast');
        this.toast.hide();
      }
    };

    instance.interceptors.request.use(config => {
      showToast();
      console.log('请求拦截', config);
      return config;
    });

    instance.interceptors.response.use(res => {
      hideToast();
      console.log('响应拦截', res);
      if (res.data.code == 0) {
        return res.data.data;
      } else { // 业务错误
        return res.data;
      }
    }, err => { // ajax 错误
      hideToast();
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
