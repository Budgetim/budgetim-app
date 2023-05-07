/**
 * Функция преобразователь числа - отделяет тысячи
 * (5000 -> 5 000)
 * (3.32 -> 3,32)
 * */
import { isString } from 'lodash';

export const separateThousands = (num: number | string, options?: Intl.NumberFormatOptions) => {
  if (isString(num)) return num;
  return num.toLocaleString('ru-RU', options);
};
