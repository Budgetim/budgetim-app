import React, { FC } from 'react';
import { Pressable, ScrollView } from 'react-native';

import { Input } from '../../../../components/Input';

import { Header, Content, Section, ModalContent, ButtonText, ModalWrapper } from './styled';
import { CategoryModalContentProps } from './types';
import { colors } from '../../../../constants/colors';
import { ColorPicker } from './ColorPicker';

export const CategoryModalContent: FC<CategoryModalContentProps> = (props) => {
  const {
    visible,
    onClose,
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    onSave,
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
          <Pressable
            onPress={() => {
              onSave();
              onClose();
            }}
          >
            <ButtonText variant="subheadlineBold">Done</ButtonText>
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            <Section>
              <Input
                variant="subheadlineRegular"
                defaultValue={title}
                onChangeText={setTitle}
                placeholder="название"
              />
            </Section>
            <Section>
              <Input
                variant="subheadlineRegular"
                defaultValue={description || ''}
                onChangeText={setDescription}
                placeholder="описание"
              />
            </Section>
            <Section>
              <ColorPicker
                onChange={color => setColor(color)}
                value={color}
                colors={colors}
              />
            </Section>
          </Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
};
