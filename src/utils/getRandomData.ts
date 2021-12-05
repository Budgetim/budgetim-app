export const getRandomData = (count: number) => {
  return new Array(count).fill(0).map(() => {
    return Math.random();
  });
};
