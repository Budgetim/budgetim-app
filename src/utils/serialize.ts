export const serialize = (obj: any) => {
  const str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== undefined) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}