export const formatNumberForServer = (num: string) => {
  if (!num) {
    return '0';
  }
  return num.replace(/\s/g, '').replace(',', '.');
};