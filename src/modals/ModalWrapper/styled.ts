import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import css, { SystemStyleObject } from '@styled-system/css';
import { TextVariant } from '../../components/TextVariant';

export const ModalStyled = styled(Modal)({
  justifyContent: 'flex-end',
  margin: 0,
  height: '80%',
});

export const ModalContent = styled(View)(
  css({
    bg: 'systemGray06',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: '85%',
  } as SystemStyleObject),
);

export const Header = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    p: 4,
  }),
);

export const ButtonText = styled(TextVariant)(
  css({
    color: 'systemBlue',
  }),
);
