let lastId = 0;

/* получение уникального id в рамках страницы */
export const getId = (prefix = 'id') => {
  lastId++;

  return `${prefix}${lastId}`;
};
