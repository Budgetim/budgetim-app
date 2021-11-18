import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import css, { SystemStyleObject } from '@styled-system/css';
import Modal from 'react-native-modal';
import { TextVariant } from '../../../components/TextVariant';

export const Container = styled(ScrollView)(css({

}));

export const Header = styled(View)(css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  p: 4,
}));

export const Content = styled(View)(css({
}));

export const ModalWrapper = styled(Modal as any)({
  justifyContent: 'flex-end',
  margin: 0,
})

export const ModalContent = styled(View)(css({
  bg: 'systemGray06',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  shadowOpacity: 0.1,
  shadowRadius: 3,
  height: '80%',
} as SystemStyleObject));

export const ButtonText = styled(TextVariant)(css({
  color: 'systemBlue',
}))
