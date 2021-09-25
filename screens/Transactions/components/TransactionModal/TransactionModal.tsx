import React, { FC, useEffect, useState } from 'react';
import {
  TextInput,
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppState } from '../../../../appContext';

import { Header, Content, Section, ModalContent, ButtonText, Category, CategoryWrapper, Categories, ModalWrapper } from './styled';
import { TransactionModalProps } from './types';
import { editTransaction } from '../../../../api/transaction/editTransaction';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible } = props;
  const { categories } = useAppState();
  const { id } = props;
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [categoryId, setCategoryId] = useState(categories.find(cat => cat.title === props.category)?.id as number);
  const [date, setDate] = useState(new Date(props.date));
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCategoryId(categories.find(cat => cat.title === props.category)?.id as number);
  }, [categories]);

  const onEdit = async () => {
    editTransaction({ id, title, categoryId, price, date }, (transaction) => {
      dispatch({ type: 'editTransaction', payload: transaction});
    });
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
                          onPress={() => {
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
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || date;
                      setDate(currentDate);
                    }}
                    maximumDate={new Date()}
                  />
                </Section>
                <Section>
                  <TextInput
                    defaultValue={price.toString()}
                    onChangeText={price => setPrice(+price)}
                    style={{ fontSize: 16 }}
                    placeholder="сумма"
                    keyboardType="numeric"
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
