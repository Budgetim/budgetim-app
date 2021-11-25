import React, { FC, useEffect, useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import Canvas from 'react-native-canvas';
import * as d3 from 'd3';
import { useTheme } from 'styled-components/native';

import { DataItem } from '../types';
import { getDataLines } from '../utils/getDataLines';
import { useChartDispatch, useChartState } from '../chartContext/chartContext';

export const Chart: FC = () => {
  const dispatch = useChartDispatch();
  const { categories, height, width, xScale, yScale, data, ticks, activeIndex, monthsList } = useChartState();
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

  useEffect(() => {
    if (canvas.current && width > 0) {
      const ctx = canvas.current.getContext('2d');
      canvas.current.width = width;
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

      ctx.clearRect(0, 0, width, height);

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

      ticks.forEach(tick => {
        // ticks separator
        const y = yScale(tick);
        ctx.beginPath();
        ctx.strokeStyle = systemGray04;
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });

      // line
      ctx.beginPath();
      path(dataLines);
      ctx.lineWidth = 2;
      ctx.lineJoin = 'bevel';
      ctx.strokeStyle = chart01;
      ctx.stroke();

      if (activeIndex !== undefined) {
        // hover line
        const x = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2;
        const y = yScale(dataLines[activeIndex].value);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, yScale(0));
        ctx.stroke();

        // hover dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }
  }, [activeIndex, data, width]);

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchStart}
      onTouchEnd={handleTouchCancel}
    >
      <Canvas ref={canvas} />
    </View>
  );
};
