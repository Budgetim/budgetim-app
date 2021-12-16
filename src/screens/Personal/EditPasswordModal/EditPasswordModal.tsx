import React, { FC } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from 'i18n-js';

import { TextVariant } from '../../../components/TextVariant';

import { Header, Content, ModalContent, ButtonText, ModalWrapper } from './styled';
import { EditPasswordModalProps } from './types';

export const EditPasswordModal: FC<EditPasswordModalProps> = props => {
  const { visible, onClose, onSave, isLoading, disable, children } = props;

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
          <TouchableOpacity onPress={onClose}>
            <ButtonText variant="subheadlineRegular">{i18n.t('common.action.cancel')}</ButtonText>
          </TouchableOpacity>
          <TextVariant variant="subheadlineRegular">{i18n.t('settings.general.action.changePassword')}</TextVariant>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row' }} onPress={onSave} disabled={disable}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <ButtonText variant="subheadlineBold" disable={disable}>
                {i18n.t('common.action.change')}
              </ButtonText>
            )}
          </TouchableOpacity>
        </Header>
        <ScrollView>
          <Content>{children}</Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
};
