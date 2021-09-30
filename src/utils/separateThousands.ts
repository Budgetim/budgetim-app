/** Функция преобразователь числа - отделяет тысячи запятой (5000 -> 5,000) */
export const separateThousands = (
  num: number | null,
  options?: Intl.NumberFormatOptions
): string => {
  if (num === null) {
    return '';
  }

  return num.toLocaleString('ru-RU', options);
};
