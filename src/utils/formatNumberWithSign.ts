import { separateThousands } from './separateThousands';

export const formatNumberWithSign = (num: string) => {
  if (num == '') {
    return '';
  }
  const end = num.match(/,\d*$/ig);
  const filterValue = num.replace(/\s/g, '').replace(',', '.');
  const newNum = separateThousands(+filterValue, { maximumFractionDigits: 2 });
  if (newNum.includes(',')) {
    return newNum;
  } else {
    return `${newNum}${end || ''}`;
  }
};
