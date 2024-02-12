import { arc } from 'd3';
import React, { FC, SVGAttributes } from 'react';
import { Path } from 'react-native-svg';

interface ArcProps {
  startAngle?: number;
  endAngle: number;
  fill?: string;
  innerRadius: number;
  outerRadius: number;
  cornerRadius?: number;
  attrs?: SVGAttributes<SVGPathElement>;
}

export const Arc: FC<ArcProps> = props => {
  const { startAngle = 0, endAngle, fill = 'none', innerRadius, outerRadius, cornerRadius = 0, attrs } = props;

  const d =
    arc().cornerRadius(cornerRadius)({
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
    }) || undefined;

  return <Path {...{ d, fill, ...attrs }} />;
};
