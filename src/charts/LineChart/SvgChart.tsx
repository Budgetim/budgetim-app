import React, { FC, useEffect, useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { useChartDispatch, useChartState } from './chartContext/chartContext';
import Canvas from 'react-native-canvas';
import * as d3 from 'd3';
import { DataItem } from './types';
import { getDataLines } from './utils/getDataLines';
import { useTheme } from 'styled-components/native';

import { TextVariant } from '../../components/TextVariant';
import format from 'date-fns/format';
import locale from 'date-fns/locale/en-US';
import { useUserState } from '../../contexts/user';
import { separateThousands } from '../../utils/separateThousands';
import { ChartContainer, Header, HeaderTitle, PriceLabel, CategoryWrapper, CategoryLabel } from './styled';

export const SvgChart: FC = ({ children }) => {
  const dispatch = useChartDispatch();
  const { currency } = useUserState();
  const { categories, height, colWidth, xScale, yScale, data, activeIndex } = useChartState();
  const fullWidth = colWidth * categories.length;
  const dataLines = getDataLines({ data, categories });
  const { colors: { chart01, systemGray04 } } = useTheme();

  const handleTouchStart = (e: GestureResponderEvent) => {
    dispatch({
      type: 'changeXPosition',
      payload: {
        x: e.nativeEvent.locationX,
      },
    });
  };

  const handleTouchCancel = () => {
    dispatch({
      type: 'changeXPosition',
      payload: {
        x: undefined
      },
    });
  };

  const canvas = useRef<Canvas>(null);

  const monthsList: { month: number; year: number, days: string[] }[] = [];
  categories.forEach(category => {
    const date = new Date(category);
    const month = date.getMonth();
    const year = date.getFullYear();
    const foundedMonth = monthsList.find(item => item.month === month && item.year === year);
    if (!foundedMonth) {
      monthsList.push({
        month,
        year,
        days: [category]
      });
    } else {
      foundedMonth.days.push(category);
    }
  });

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      canvas.current.width = fullWidth;
      canvas.current.height = height;

      const path = d3
        .line<DataItem>()
        .x(d => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
        .y(d => yScale(d.value as number) as number)
        .curve(d3.curveLinear)
        .context(ctx);

      const area = d3
        .area<DataItem>()
        .x(d => ((xScale(d.category) as number) + xScale.bandwidth() / 2) as number)
        .y0(d => yScale(d.value as number) as number)
        .y1(() => yScale.range()[0])
        .curve(d3.curveLinear)
        .context(ctx);

      ctx.clearRect(0, 0, fullWidth, height);

      // area
      ctx.beginPath();
      ctx.fillStyle = chart01;
      ctx.globalAlpha = 0.2;
      area(dataLines);
      ctx.fill();
      ctx.closePath();

      monthsList.forEach(item => {
        // month separator
        const x = (xScale(item.days[0]) as number);
        ctx.beginPath();
        ctx.strokeStyle = systemGray04;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      });

      // line
      ctx.beginPath();
      path(dataLines);
      ctx.lineWidth = 2;
      ctx.strokeStyle = chart01;
      ctx.stroke();

      if (activeIndex !== undefined) {
        // hover line
        const x = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2;
        const y = yScale(dataLines[activeIndex].value);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // hover dot
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }
  }, [activeIndex]);

  return (
    <ChartContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchStart}
      onTouchEnd={handleTouchCancel}
    >
      <Header>
        {activeIndex !== undefined && (
          <>
            <HeaderTitle variant="footnoteBold">
              {format(new Date(categories[activeIndex]), 'd MMMM yyyy')}
            </HeaderTitle>
            <PriceLabel
              style={{
                transform: [{ translateX: xScale(categories[activeIndex]) as number }],
              }}
            >
              <TextVariant variant="footnoteBold">
                {separateThousands(dataLines[activeIndex].value)} {currency?.unit}
              </TextVariant>
            </PriceLabel>
          </>
        )}
      </Header>
      <Canvas ref={canvas} />
      {monthsList.map((item, index) => {
        const start = xScale(item.days[0]) as number;
        const end = (xScale(item.days[item.days.length - 1]) as number) + xScale.bandwidth();
        const width = end - start;
        return (
          <CategoryWrapper
            key={`${item.month}${item.year}`}
            width={width}
            style={{ transform: [{ translateX: start }]}}
          >
            <CategoryLabel variant="footnoteRegular">
              {format(new Date(item.year, item.month, 1), 'LLLL', { locale })}
            </CategoryLabel>
          </CategoryWrapper>
        );
      })}
    </ChartContainer>
  );
};
