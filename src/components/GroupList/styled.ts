import styled from 'styled-components/native';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '@styled-system/css';
import { TextVariant } from '../TextVariant';
import { color, ColorProps } from 'styled-system';

export const List = styled(FlatList)(
  css({
    bg: 'systemGray06',
    borderRadius: 12,
  }),
) as unknown as typeof FlatList;

export const Item = styled(TouchableOpacity)(
  css({
    pl: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
);

export const TextContent = styled(View)<{ borderBottom: boolean }>(({ borderBottom }) =>
  css({
    ...(borderBottom
      ? {
          borderColor: 'systemGray05',
          borderBottomWidth: 0.5,
        }
      : {}),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    py: 3,
    pr: 4,
  }),
);

export const MainIconWrapper = styled(View)<ColorProps>(
  css({
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    mr: 3,
  }),
  color,
);

export const Text = styled(TextVariant)(
  css({
    color: 'textPrimary',
    flex: 1,
    mr: 2,
  }),
);

export const Variant = styled(TextVariant)(
  css({
    color: 'systemGray01',
    mr: 2,
  }),
);
