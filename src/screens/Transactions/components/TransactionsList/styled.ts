import styled from 'styled-components/native'
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../../../components/TextVariant';

export const TitleWrapper = styled(View)(css({
  borderColor: 'systemGray05',
  borderBottomWidth: 0.5,
  ml: 4,
  pt: 7,
  pb: 2,
}));

export const Title = styled(TextVariant)(css({
  color: 'textPrimary',
}));