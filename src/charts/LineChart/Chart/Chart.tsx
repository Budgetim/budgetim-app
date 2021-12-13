import React, { FC, useEffect, useRef, useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import Canvas from 'react-native-canvas';
import { useTheme } from 'styled-components/native';
import { Wrapper, StaticCanvas } from './styled';

import { getDataLines } from '../utils/getDataLines';
import { useChartDispatch, useChartState } from '../chartContext/chartContext';

const MAX_COL_WIDTH = 40;

export const drawBar = (ctx: any, x: number, y: number, width: number, height: number) => {
  let radius = 6;

  const size = Math.min(width, height);

  if (size / 2 < radius) {
    radius = size / 2;
  }

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
};

export const Chart: FC = () => {
  const staticCanvas = useRef<Canvas>(null);
  const dynamicCanvas = useRef<Canvas>(null);
  const [hoverActive, setHoverActive] = useState(false);
  const dispatch = useChartDispatch();
  const { categories, height, width, xScale, yScale, data, ticks, activeIndex, monthsList } = useChartState();
  const dataLines = getDataLines({ data, categories });
  const {
    colors: { chart01, systemGray05 },
  } = useTheme();

  const handleTouchStart = (e: GestureResponderEvent) => {
    dispatch({
      type: 'changeXPosition',
      payload: {
        x: e.nativeEvent.locationX,
      },
    });
  };

  useEffect(() => {
    setHoverActive(activeIndex !== undefined);
  }, [activeIndex]);

  const handleTouchCancel = () => {
    dispatch({
      type: 'changeXPosition',
      payload: {
        x: undefined,
      },
    });
  };

  useEffect(() => {
    if (staticCanvas.current) {
      const ctx = staticCanvas.current.getContext('2d');
      staticCanvas.current.width = width;
      staticCanvas.current.height = height;

      ctx.clearRect(0, 0, width, height);

      monthsList.forEach(item => {
        // month separator
        const x = xScale(item.days[0]) as number;
        ctx.beginPath();
        ctx.strokeStyle = systemGray05;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      });

      ticks.forEach(tick => {
        // ticks separator
        const y = yScale(tick);
        ctx.globalAlpha = hoverActive ? 0.5 : 1;
        ctx.beginPath();
        ctx.strokeStyle = systemGray05;
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });

      // bars
      dataLines.forEach(item => {
        const colWidth = xScale.bandwidth() > MAX_COL_WIDTH ? MAX_COL_WIDTH : xScale.bandwidth();
        const x = (xScale(item.category) as number) + xScale.bandwidth() / 2 - colWidth / 2 + 0.25;
        const y = yScale(item.value);
        ctx.fillStyle = chart01;
        drawBar(ctx, x, y, colWidth - 0.5, yScale(0) - y);
      });
    }
  }, [data, width, hoverActive]);

  useEffect(() => {
    if (dynamicCanvas.current) {
      const ctx = dynamicCanvas.current.getContext('2d');
      dynamicCanvas.current.width = width;
      dynamicCanvas.current.height = height;

      if (activeIndex !== undefined) {
        // hover line
        const x = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2;
        ctx.beginPath();
        ctx.strokeStyle = chart01;
        ctx.lineWidth = 1;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, yScale(0));
        ctx.stroke();

        const colWidth = xScale.bandwidth() > MAX_COL_WIDTH ? MAX_COL_WIDTH : xScale.bandwidth();
        const rectX = (xScale(categories[activeIndex]) as number) + xScale.bandwidth() / 2 - colWidth / 2 + 0.25;
        const rectY = yScale(dataLines[activeIndex].value);
        ctx.fillStyle = chart01;
        drawBar(ctx, rectX, rectY, colWidth - 0.5, yScale(0) - rectY);
      }
    }
  }, [activeIndex]);

  return (
    <Wrapper onTouchStart={handleTouchStart} onTouchMove={handleTouchStart} onTouchEnd={handleTouchCancel}>
      <StaticCanvas ref={staticCanvas} />
      <Canvas ref={dynamicCanvas} />
    </Wrapper>
  );
};
