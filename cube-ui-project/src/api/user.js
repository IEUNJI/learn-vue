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

export const upload = (fd) => {
  return axios.request({
    method: 'POST',
    url: '/avatar',
    Headers: {
      'content-type': 'multipart/form-data'
    },
    data: fd
  });
};
