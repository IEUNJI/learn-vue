import createApp from './main';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matches = router.getMatchedComponents();

      if (matches.length === 0) {
        reject({ code: 404 });
        return;
      }

      Promise.all(matches.map(component => {
        if (component.asyncData) {
          return component.asyncData(store);
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      });

    }, reject);
  });
};
