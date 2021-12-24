import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css from '@styled-system/css';
import { TextVariant } from '../../components/TextVariant';

export const Container = styled(ScrollView)(
  css({
    px: 4,
    py: 9,
  }),
);

export const SignOutButton = styled(TouchableOpacity)(
  css({
    p: 3,
    mt: 9,
    bg: 'systemGray06',
    borderRadius: 12,
  }),
);

export const Link = styled(TextVariant)(
  css({
    color: 'systemRed',
    textAlign: 'center',
  }),
);
