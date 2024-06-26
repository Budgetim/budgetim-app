import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import css, { SystemStyleObject } from '@styled-system/css';
import { TextVariant } from '../../components/TextVariant';

export const ModalStyled = styled(Modal)(
  css({
    justifyContent: 'flex-end',
    margin: 0,
  }),
);

export const ModalContent = styled(View)<{ isFull: boolean }>(({ isFull }) =>
  css({
    bg: 'bgPrimary',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: isFull ? '85%' : '65%',
  } as SystemStyleObject),
);

export const Header = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bg: 'systemGray06',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: 'systemGray05',
    borderBottomWidth: 0.5,
    p: 4,
  }),
);

export const ButtonText = styled(TextVariant)(
  css({
    color: 'systemBlue',
  }),
);
