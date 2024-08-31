export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms * 1000); // 3000 milisegundos equivalen a 3 segundos
  });
};
