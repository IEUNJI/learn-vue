import Loading from '@/components/Loading.vue';

const loadable = asyncFunction => {
  const asyncComponent = () => ({
    component: asyncFunction(),
    loading: Loading
  });

  return {
    render(h) {
      return h(asyncComponent);
    }
  };
};

export default loadable;
