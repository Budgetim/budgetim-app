import React, { FC } from 'react';
import { ButtonText, Header, ModalContent, ModalStyled } from './styled';
import { Pressable } from 'react-native';
import i18n from 'i18n-js';

interface TransactionModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  height?: 'full' | 'shirt';
}

export const ModalWrapper: FC<TransactionModalWrapperProps> = ({ isVisible, onClose, height = 'full', children }) => {
  return (
    <ModalStyled
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      avoidKeyboard
      propagateSwipe
    >
      <ModalContent isFull={height === 'full'}>
        <Header>
          <Pressable style={{ display: 'flex', flexDirection: 'row' }} onPress={onClose}>
            <ButtonText variant="subheadlineBold">{i18n.t('common.action.close')}</ButtonText>
          </Pressable>
        </Header>
        {children}
      </ModalContent>
    </ModalStyled>
  );
};
