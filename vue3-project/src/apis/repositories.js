export const fetchUserRepositories = user => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === 'ieunji') {
        resolve([1, 2, 3, 4, 5]);
      } else {
        resolve([6, 7, 8, 9, 10]);
      }
    }, 1000);
  });
};
