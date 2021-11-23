export type GetYRangeProps = (params: { height: number; }) => [number, number];

export const getYRange: GetYRangeProps = ({ height }) => {
  const paddingBottom = 8;
  const lineHeight = 16;

  return [height - lineHeight - paddingBottom, 5];
};
