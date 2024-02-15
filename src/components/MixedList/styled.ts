import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { color, ColorProps } from 'styled-system';

export const MainTitle = styled(TextVariant)(
  css({
    color: 'textSecondary',
    ml: 3,
    mb: 1,
    textTransform: 'uppercase',
  }),
);

export const List = styled(FlatList)<ColorProps>(
  css({
    bg: 'systemGray06',
    borderRadius: 12,
  }),
  color,
) as unknown as typeof FlatList;
