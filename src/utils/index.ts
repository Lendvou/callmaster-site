export const getRandomInteger = (min: number, max: number) => {
  const minC = Math.ceil(min);
  const maxF = Math.floor(max);
  return Math.floor(Math.random() * (maxF - minC) + minC); //The maximum is exclusive and the minimum is inclusive
};

export const arrayHasItems = (arr: any[]) => Array.isArray(arr) && arr.length > 0;

export const objectHasProperties = (obj: Object) =>
  typeof obj === 'object' && obj && Object.keys(obj).length > 0;
