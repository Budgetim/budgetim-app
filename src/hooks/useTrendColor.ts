import { Trend } from '../types';
import { useTheme } from 'styled-components/native';

export const useTrendColor = (trend: Trend) => {
  const { colors: { systemRed, systemGreen, systemGray01 } } = useTheme();

  switch (trend) {
    case 'NEGATIVE':
      return systemRed;
    case 'POSITIVE':
      return systemGreen;
    case 'NEUTRAL':
      return systemGray01;
  }
};
