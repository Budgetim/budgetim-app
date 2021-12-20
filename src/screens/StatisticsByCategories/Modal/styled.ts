import styled from 'styled-components/native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import css, { SystemStyleObject } from '@styled-system/css';
import Modal from 'react-native-modal';
import { TextVariant } from '../../../components/TextVariant';

export const Header = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'systemGray04',
    mb: 1,
    pb: 2,
  }),
);

export const Titles = styled(View)(
  css({
    flex: 1,
  }),
);

export const Title = styled(TextVariant)(
  css({
    mb: 1,
  }),
);

export const CloseButton = styled(TouchableOpacity)(
  css({
    p: 1,
    mr: -1,
  }),
);

export const Content = styled(View)(css({ mb: 12 }));

export const Description = styled(TextVariant)(
  css({
    color: 'textSecondary',
  }),
);

export const ModalWrapper = styled(Modal as any)({
  justifyContent: 'flex-end',
  margin: 0,
});

export const ModalContent = styled(View)(
  css({
    bg: 'systemGray06',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    pt: 4,
    px: 4,
  } as SystemStyleObject),
);

export const AdMobContainer = styled(View)(
  css({
    mx: -4,
  }),
);
