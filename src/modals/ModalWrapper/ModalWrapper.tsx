import React, { FC } from 'react';
import { Header, ModalContent, ModalStyled, ButtonText } from './styled';
import { Pressable } from 'react-native';

interface TransactionModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  action: () => void;
  actionText: string;
  height?: 'full' | 'shirt';
}

export const ModalWrapper: FC<TransactionModalWrapperProps> = ({
  isVisible,
  onClose,
  action,
  actionText,
  height = 'full',
  children,
}) => {
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
          <Pressable onPress={action}>
            <ButtonText variant="subheadlineBold">{actionText}</ButtonText>
          </Pressable>
        </Header>
        {children}
      </ModalContent>
    </ModalStyled>
  );
};
