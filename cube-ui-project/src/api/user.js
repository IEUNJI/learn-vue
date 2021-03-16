import axios from '@/utils/ajaxRequest';

export const login = user => {
  return axios.request({
    url: '/login',
    method: 'POST',
    data: user
  });
};

export const validate = () => {
  return axios.request({
    url: '/validate'
  });
};
