import React, { FC } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Svg } from 'react-native-svg';
import { useChartDispatch, useChartState } from './chartContext/chartContext';

export const SvgChart: FC = ({ children }) => {
  const dispatch = useChartDispatch();
  const { categories, height, colWidth } = useChartState();
  const fullWidth = colWidth * categories.length;

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

  return (
    <Svg
      width={fullWidth}
      height={height}
      onTouchMove={handleTouchStart}
      onTouchEnd={handleTouchCancel}
    >
      {children}
    </Svg>
  );
};
