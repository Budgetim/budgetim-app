/**
 * Преобразование угла в радианы по формуле α * π / 180
 *
 * @param {number} degree угол от 0 до 360 градусов
 */
export const convertDegreeToRadian = (degree: number) => (degree * Math.PI) / 180;
