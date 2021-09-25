import React, { FC, useEffect, useState } from 'react';
import {
  TextInput,
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { useAppDispatch, useAppState } from '../../../../appContext';

import { Header, Content, Section, ModalContent, ButtonText, Category, CategoryWrapper, Categories, ModalWrapper } from './styled';
import { TransactionModalProps } from './types';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible } = props;
  const { categories } = useAppState();
  const { id } = props;
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [categoryId, setCategoryId] = useState(categories.find(cat => cat.title === props.category)?.id);
  const [date, setDate] = useState(props.date);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCategoryId(categories.find(cat => cat.title === props.category)?.id);
  }, [categories]);

  const onEdit = async () => {
    try {
      const response = await fetch('https://api.budgetim.ru/transaction/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title,
          categoryId,
          price,
          date,
        }),
      });
      const transaction = await response.json();
      dispatch({ type: 'editTransaction', payload: transaction});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ModalWrapper>
          <ModalContent>
            <Header>
              <Pressable onPress={() => setVisible(!visible)}>
                <ButtonText>отменить</ButtonText>
              </Pressable>
              <Pressable
                onPress={() => {
                  setVisible(!visible);
                  onEdit();
                }}
              >
                <ButtonText style={{ fontWeight: 'bold' }}>сохранить</ButtonText>
              </Pressable>
            </Header>
            <ScrollView>
              <Content>
                <Section>
                  <TextInput
                    defaultValue={title}
                    onChangeText={setTitle}
                    style={{ fontSize: 16 }}
                  />
                </Section>
                <Section>
                  <Categories>
                    {categories.map((item, index) => {
                      return (
                        <CategoryWrapper
                          key={item.id}
                          hasBorder={index !== categories.length - 1}
                          onTouchStart={() => {
                            setCategoryId(item.id);
                          }}
                        >
                          <Category isSelected={item.id === categoryId}>
                            {item.title}
                          </Category>
                        </CategoryWrapper>
                      );
                    })}
                  </Categories>
                </Section>
                <Section>
                  <TextInput
                    defaultValue={date}
                    onChangeText={setDate}
                    style={{ fontSize: 16, color: '#939393' }}
                  />
                </Section>
                <Section>
                  <TextInput
                    defaultValue={price.toString()}
                    onChangeText={price => setPrice(+price)}
                    style={{ fontSize: 16 }}
                  />
                </Section>
              </Content>
            </ScrollView>
          </ModalContent>
        </ModalWrapper>
      </KeyboardAvoidingView>
    </Modal>
  );
};
