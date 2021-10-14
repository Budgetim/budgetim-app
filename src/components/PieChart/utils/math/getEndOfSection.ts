import { convertDegreeToRadian } from './convertDegreeToRadian';

/**
 * Возвращает угол конца секции круга в радианах.
 *
 * @param {number} endPart Край сектора круга [0:1]
 */
export const getEndOfSection = (endPart: number) => convertDegreeToRadian(360 * endPart - 90);
