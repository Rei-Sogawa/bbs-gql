export const sleep = (ms = 0) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );
