import * as d3 from 'd3';
import React, { createContext, useReducer, useContext, FC } from 'react';
import { getYDomain } from '../utils/getYDomain';
import { getYRange } from '../utils/getYRange';
import { ChartDispatchAction, ChartContextState, ChartDispatch } from './types';
import { LineChartProps } from '../LineChart';

const ChartStateContext = createContext<ChartContextState | undefined>(undefined);

const ChartDispatchContext = createContext<ChartDispatch | undefined>(undefined);

const chartReducer = (state: ChartContextState, action: ChartDispatchAction) => {
  const { colWidth } = state;
  switch (action.type) {
    case 'changeXPosition': {
      const { x } = action.payload;
      return {
        ...state,
        xPosition: x !== undefined ? Math.floor(x / colWidth) * colWidth + colWidth / 2 : undefined,
        activeIndex: x !== undefined ? Math.floor(x / colWidth) : undefined,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

export const ChartProvider: FC<LineChartProps> = props => {
  const {
    categories,
    height,
    data,
    children,
    width,
  } = props;
  const fullWidth = width;
  const colWidth = fullWidth / categories.length;

  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, fullWidth]);

  const yDomain = getYDomain({ data });
  const yRange = getYRange({ height });
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range(yRange);

  const [state, dispatch] = useReducer(chartReducer, {
    activeIndex: undefined,
    xPosition: undefined,
    xScale,
    yScale,
    data,
    categories,
    height,
    colWidth,
  });

  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchContext.Provider value={dispatch}>{children}</ChartDispatchContext.Provider>
    </ChartStateContext.Provider>
  );
};

export const useChartState = () => {
  const context = useContext(ChartStateContext);
  if (context === undefined) {
    throw new Error('useChartState must be used within a ChartProvider');
  }
  return context;
};

export const useChartDispatch = () => {
  const context = useContext(ChartDispatchContext);
  if (context === undefined) {
    throw new Error('useChartDispatch must be used within a ChartProvider');
  }
  return context;
};
