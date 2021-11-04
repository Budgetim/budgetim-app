import React, { FC } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
} from 'react-native';
// @ts-ignore
import ColorPalette from 'react-native-color-palette';
import { Input } from '../../../../components/Input';

import { Header, Content, Section, ModalContent, ButtonText, ModalWrapper } from './styled';
import { CategoryModalContentProps } from './types';
import { colors } from '../../../../constants/colors';

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
            <ButtonText variant="subheadlineRegular">cancel</ButtonText>
          </Pressable>
          <Pressable
            onPress={() => {
              onSave();
              onClose();
            }}
          >
            <ButtonText variant="subheadlineBold">save</ButtonText>
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
              <ColorPalette
                onChange={(color: string) => setColor(color)}
                value={color}
                colors={colors}
                icon={<Text style={{ color: '#fff' }}>✔</Text>}
              />
            </Section>
          </Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
};
