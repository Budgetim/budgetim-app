export interface GetPointOnCircleParams {
  radius: number;
  radianValue: number; // [0:1]
}

/* поиск точки на окружности */
export const getPointOnCircle = ({ radius, radianValue }: GetPointOnCircleParams) => {
  return {
    x: radius * Math.cos(radianValue),
    y: radius * Math.sin(radianValue),
  }
}
