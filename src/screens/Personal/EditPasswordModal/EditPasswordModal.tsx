import React, { FC } from 'react';
import { Pressable, ScrollView, ActivityIndicator } from 'react-native';

import { TextVariant } from '../../../components/TextVariant';

import { Header, Content, ModalContent, ButtonText, ModalWrapper } from './styled';
import { EditPasswordModalProps } from './types';

export const EditPasswordModal: FC<EditPasswordModalProps> = (props) => {
  const {
    visible,
    onClose,
    onSave,
    isLoading,
    disable,
    children,
  } = props;

  return (
    <ModalWrapper
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      avoidKeyboard
      propagateSwipe
    >
      <ModalContent>
        <Header>
          <Pressable onPress={onClose}>
            <ButtonText variant="subheadlineRegular">Cancel</ButtonText>
          </Pressable>
          <TextVariant variant="subheadlineRegular">Change password</TextVariant>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onSave}
            disabled={disable}
          >
            {isLoading ? <ActivityIndicator /> : <ButtonText variant="subheadlineBold" disable={disable}>Change</ButtonText>}
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            {children}
          </Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
};
