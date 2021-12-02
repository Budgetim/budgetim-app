import styled from 'styled-components/native';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import css, { SystemStyleObject } from '@styled-system/css';
import { TextVariant } from '../TextVariant';

export const Header = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    p: 4,
  }),
);

export const Content = styled(View)(
  css({
    p: 4,
  }),
);

export const SectionGroup = styled(View)(
  css({
    display: 'flex',
    flexDirection: 'row',
  }),
);

export const Section = styled(View)<{ error?: boolean }>(({ error }) =>
  css({
    borderRadius: 12,
    bg: 'bgPrimary',
    p: 4,
    mb: 4,
    ...(error
      ? {
          borderColor: 'systemRed',
          borderWidth: 0.5,
        }
      : {}),
  }),
);

export const NameSection = styled(Section)(
  css({
    flex: '1 1 auto',
    mr: 4,
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
    maxHeight: '80%',
  } as SystemStyleObject),
);

export const ButtonText = styled(TextVariant)(
  css({
    color: 'systemBlue',
  }),
);
