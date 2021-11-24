import * as d3 from 'd3';
import React, { createContext, useReducer, useContext, FC, useEffect } from 'react';
import { getYDomain } from '../utils/getYDomain';
import { getYRange } from '../utils/getYRange';
import { ChartDispatchAction, ChartContextState, ChartDispatch } from './types';
import { LineChartProps } from '../LineChart';

const ChartStateContext = createContext<ChartContextState | undefined>(undefined);
const ChartDispatchContext = createContext<ChartDispatch | undefined>(undefined);

const chartReducer = (state: ChartContextState, action: ChartDispatchAction) => {
  const { categories, xScale } = state;
  switch (action.type) {
    case 'changeXPosition': {
      const { x } = action.payload;
      let activeIndex = x !== undefined ? Math.floor(x / xScale.bandwidth()) : undefined;
      if (activeIndex !== undefined && activeIndex < 0) {
        activeIndex = 0;
      }
      if (activeIndex !== undefined && activeIndex >= categories.length) {
        activeIndex = categories.length - 1;
      }
      return {
        ...state,
        activeIndex,
      };
    }

    case 'updateInitialArg': {
      const { args } = action.payload;
      return args;
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
};

export const ChartProvider: FC<LineChartProps & { width: number }> = props => {
  const {
    categories,
    height,
    data,
    children,
    width,
  } = props;

  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, width]);

  const yDomain = getYDomain({ data });
  const yRange = getYRange({ height });
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range(yRange);
  const ticks = yScale.ticks(4);

  const initialState = {
    activeIndex: undefined,
    xScale,
    yScale,
    data,
    categories,
    height,
    width,
    ticks,
  };

  const [state, dispatch] = useReducer(chartReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'updateInitialArg',
      payload: { args: initialState }
    });
    // все внешние пропсы, после которых нужно полностью сбросить состояние графика
  }, [data, width]);

  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchContext.Provider value={dispatch}>
        {children}
      </ChartDispatchContext.Provider>
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
