import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView, TouchableWithoutFeedback,
  Text,
} from 'react-native';
// @ts-ignore
import ColorPalette from 'react-native-color-palette';

import { useUser } from '../../../../appContext';
import { Input } from '../../../../components/Input';

import { Header, Content, Section, ModalContent, ButtonText, ModalWrapper } from './styled';
import { CategoryModalProps } from './types';
import { editCategory } from '../../../../api/category/editCategory';
import { addCategory } from '../../../../api/category/addCategory';
import { colors } from '../../../../constants/colors';
import { useCategoriesDispatch } from '../../../../constexts/categories';

export const CategoryModal: FC<CategoryModalProps> = (props) => {
  const { visible, setVisible, category } = props;
  const { id } = category;
  const [title, setTitle] = useState(category.title || '');
  const [description, setDescription] = useState(category.description);
  const [color, setColor] = useState(category.color);
  const dispatch = useCategoriesDispatch();
  const { token } = useUser();

  useEffect(() => {
    setTitle(category.title || '');
    setDescription(category.description);
    setColor(category.color);
  }, [visible]);

  const onEdit = async () => {
    if (id) {
      const category = await editCategory({ id, description, title, color }, token);
      dispatch({ type: 'editCategory', payload: { category } });
    } else {
      const category = await addCategory({ description, title, color }, token);
      dispatch({ type: 'addCategory', payload: { category } });
    }
  }


  return (
    <Modal animationType="slide" transparent visible={visible}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ModalWrapper>
            <TouchableWithoutFeedback>
              <ModalContent>
                <Header>
                  <Pressable onPress={() => setVisible(!visible)}>
                    <ButtonText variant="subheadlineRegular">cancel</ButtonText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setVisible(!visible);
                      void onEdit();
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
            </TouchableWithoutFeedback>
          </ModalWrapper>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
