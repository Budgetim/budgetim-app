import styled from 'styled-components/native';
import { View } from 'react-native';
import css, { SystemStyleObject } from '@styled-system/css';
import { TextVariant } from '../../../../components/TextVariant';

export const Header = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  p: 4,
}))

export const Content = styled(View)(css({
  p: 4,
}))

export const Section = styled(View)(css({
  borderRadius: 12,
  bg: 'bgPrimary',
  p: 4,
  mb: 4,
}));

export const ModalWrapper = styled(View)({
  flex: 1,
  justifyContent: 'flex-end',
  display: 'flex',
});

export const ModalContent = styled(View)(css({
  bg: 'systemGray06',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  shadowOpacity: 0.1,
  shadowRadius: 3,
  maxHeight: '80%',
} as SystemStyleObject));

export const ButtonText = styled(TextVariant)(css({
  color: 'systemBlue',
}))
