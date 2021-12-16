import styled from 'styled-components/native';
import css from '@styled-system/css';

import { TextVariant } from '../../../components/TextVariant';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const PieChartWrapper = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  }),
);

export const NavigateButton = styled(TouchableOpacity)(
  css({
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
  }),
);

export const ChartSubtitle = styled(TextVariant)(
  css({
    color: 'textSecondary',
    mb: 1,
  }),
);

export const ChartTitle = styled(TextVariant)(
  css({
    color: 'textPrimary',
  }),
);
