import React, { FC } from 'react';
import * as d3 from 'd3';
import { G, Circle, Line } from 'react-native-svg';
import { useTheme } from 'styled-components';

import { Arc } from './Arc';
import { getData } from './utils/getData';
import { getEndOfSection } from './utils/math/getEndOfSection';
import { getPointOnCircle } from './utils/math/getPointOnCircle';
import { Container, SvgCircle, LabelWrapper } from './styled';
import { PieChartProps } from './types';

export const PieChart: FC<PieChartProps> = props => {
  const { innerRadius, segmentWidth, outerSegmentWidth, children } = props;

  const { colors: { systemGray03, bgPrimary } } = useTheme();

  // ширина сектора круга
  const scaleWidth = d3
    .scaleLinear()
    .domain([0, props.data.length ? Math.max(...props.data.map(value => value.additionalValue)) : 1])
    .range([0, outerSegmentWidth]);

  const outerRadius = innerRadius + segmentWidth;
  const radius = outerRadius + outerSegmentWidth;
  const size = radius * 2;

  const data = getData(props.data);

  return (
    <Container>
      <SvgCircle width={size} height={size}>
        <G
          transform={`translate(${outerRadius + outerSegmentWidth},${outerRadius +
          outerSegmentWidth})`}
        >
          <Arc
            endAngle={Math.PI * 2}
            fill={systemGray03}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
          <Arc
            endAngle={Math.PI * 2}
            fill={systemGray03}
            innerRadius={outerRadius}
            outerRadius={outerRadius + (scaleWidth(1) as number)}
            attrs={{ opacity: 0.85 }}
          />
          {data.map(({ lastPart, part, id, additionalValue, arc }) => {
            const radianValue = getEndOfSection(lastPart + part);
            const point = getPointOnCircle({ radius, radianValue });

            const trendCircleParams = {
              cx: point.x,
              cy: point.y,
              r: outerRadius,
              fill: `url(#gradient-${id})`,
            };

            return (
              <G key={id}>
                {additionalValue && (
                  <G opacity="0.85">
                    <Arc
                      {...arc}
                      innerRadius={outerRadius}
                      outerRadius={outerRadius + (scaleWidth(additionalValue) as number)}
                    />
                  </G>
                )}
                <Arc {...arc} innerRadius={innerRadius} outerRadius={outerRadius} attrs={{ opacity: 1 }} />
              </G>
            );
          })}
        </G>
        {data.length > 1 && data.map(({ lastPart, part  }, index) => {
          const radianValue = getEndOfSection(lastPart + part);
          const point = getPointOnCircle({ radius, radianValue });

          return (
            <Line
              key={index}
              x1={radius}
              y1={radius}
              x2={radius + point.x}
              y2={radius + point.y}
              stroke={bgPrimary}
              strokeWidth={0.5}
            />
          );
        })}
      </SvgCircle>
      {children && (
        <LabelWrapper width={size} height={size}>
          {children}
        </LabelWrapper>
      )}
    </Container>
  );
};
