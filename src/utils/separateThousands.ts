/**
 * Функция преобразователь числа - отделяет тысячи
 * (5000 -> 5 000)
 * (3.32 -> 3,32)
 * */
export const separateThousands = (num: number, options?: Intl.NumberFormatOptions) => {
  return num.toLocaleString('ru-RU', options);
};
