import axios from '@/utils/ajaxRequest';

export const fetchCategory = () => {
  return axios.request({
    url: 'category',
  });
};

export const fetchSlides= () => {
  return axios.request({
    url: 'slides',
  });
};

export const fetchLessonList= ({id, size, offset}) => {
  return axios.request({
    url: `/lessonList/${id}?size=${size}&offset=${offset}`,
  });
};
