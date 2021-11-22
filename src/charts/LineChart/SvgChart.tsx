import React, { FC, useEffect, useRef } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { useChartDispatch, useChartState } from './chartContext/chartContext';
import Canvas from 'react-native-canvas';
import * as d3 from 'd3';
import { DataItem } from './types';
import { getDataLines } from './utils/getDataLines';
import { useTheme } from 'styled-components/native';

export const SvgChart: FC = ({ children }) => {
  const dispatch = useChartDispatch();
  const { categories, height, colWidth, xScale, yScale, data, activeIndex } = useChartState();
  const fullWidth = colWidth * categories.length;
  const dataLines = getDataLines({ data, categories });
  const { colors: { chart01 } } = useTheme();

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

      // line
      ctx.beginPath();
      path(dataLines);
      ctx.lineWidth = 2;
      ctx.strokeStyle = chart01;
      ctx.stroke();

      // area
      ctx.beginPath();
      ctx.fillStyle = chart01;
      ctx.globalAlpha = 0.2;
      area(dataLines);
      ctx.fill();
      ctx.closePath();

      if (activeIndex !== undefined) {
        // hover line
        const x = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2;
        const y = yScale(dataLines[activeIndex].value);
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.fillStyle = chart01;
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // hover dot
        ctx.beginPath();
        ctx.fillStyle = chart01;
        ctx.arc(x, y, 3.5, 0, 2 * Math.PI, false);
        ctx.fill();
      }
    }
  }, [activeIndex]);

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
