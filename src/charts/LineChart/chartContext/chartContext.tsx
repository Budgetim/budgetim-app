import * as d3 from 'd3';
import maxBy from 'lodash/maxBy';
import React, { createContext, useReducer, useContext, FC, useEffect } from 'react';
import { ChartDispatchAction, ChartContextState, ChartDispatch } from './types';
import { LineChartProps } from '../types';

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

  const max = maxBy(data, 'value')?.value || 0;
  const yScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([height - 4, 4]);

  const ticks = yScale.ticks(4);

  const monthsList: ChartContextState['monthsList'] = [];
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

  const initialState = {
    activeIndex: undefined,
    xScale,
    yScale,
    data,
    categories,
    height,
    width,
    ticks,
    monthsList,
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
