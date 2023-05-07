import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import css from '@styled-system/css';
import { TextVariant } from '../../../../../../components/TextVariant';

export const Wrapper = styled(View)(
  css({
    m: -4,
  }),
);

export const ShowMoreWrapper = styled(TouchableOpacity)(
  css({
    p: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
);

export const ShowMoreText = styled(TextVariant)(
  css({
    color: 'textPrimary',
    ml: 2,
  }),
);

export const AddButton = styled(TouchableOpacity)(
  css({
    display: 'flex',
    flexDirection: 'row',
    p: 4,
    alignItems: 'center',
  }),
);

export const AddText = styled(TextVariant)(
  css({
    color: 'systemBlue',
    ml: 2,
  }),
);
