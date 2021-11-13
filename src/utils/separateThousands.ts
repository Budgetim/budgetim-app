/** Функция преобразователь числа - отделяет тысячи (5000 -> 5 000) */
export const separateThousands = (num: number, options?: Intl.NumberFormatOptions) => {
  return num.toLocaleString('ru-RU', options);
};
