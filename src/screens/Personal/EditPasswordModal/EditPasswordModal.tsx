import React, { FC } from 'react';
import { Pressable, ScrollView, ActivityIndicator } from 'react-native';
import i18n from 'i18n-js';

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
            <ButtonText variant="subheadlineRegular">{i18n.t('common.action.cancel')}</ButtonText>
          </Pressable>
          <TextVariant variant="subheadlineRegular">{i18n.t('settings.personal.action.changePassword')}</TextVariant>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onSave}
            disabled={disable}
          >
            {isLoading ? <ActivityIndicator /> : <ButtonText variant="subheadlineBold" disable={disable}>{i18n.t('common.action.change')}</ButtonText>}
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
