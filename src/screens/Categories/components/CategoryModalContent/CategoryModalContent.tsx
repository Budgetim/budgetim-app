import React, { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import i18n from 'i18n-js';

import { Input } from '../../../../components/Input';

import { Header, Content, Section, ModalContent, ButtonText, ModalWrapper } from './styled';
import { CategoryModalContentProps } from './types';
import { colors } from '../../../../constants/colors';
import { ColorPicker } from './ColorPicker';

export const CategoryModalContent: FC<CategoryModalContentProps> = props => {
  const { visible, onClose, title, setTitle, description, setDescription, color, setColor, onSave } = props;

  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  const submit = () => {
    if (title) {
      onSave();
      onClose();
    } else {
      setTitleError(true);
    }
  };

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
          <Pressable onPress={submit}>
            <ButtonText variant="subheadlineBold">{i18n.t('common.action.done')}</ButtonText>
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            <Section error={titleError}>
              <Input
                variant="subheadlineRegular"
                defaultValue={title}
                onChangeText={setTitle}
                placeholder={i18n.t('categories.form.name')}
              />
            </Section>
            <Section>
              <Input
                variant="subheadlineRegular"
                defaultValue={description || ''}
                onChangeText={setDescription}
                placeholder={i18n.t('categories.form.description')}
              />
            </Section>
            <Section>
              <ColorPicker onChange={color => setColor(color)} value={color} colors={colors} />
            </Section>
          </Content>
        </ScrollView>
      </ModalContent>
    </ModalWrapper>
  );
};
