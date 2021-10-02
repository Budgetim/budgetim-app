import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppState } from '../../../../appContext';
import { Input } from '../../../../components/Input';

import { Header, Content, Section, ModalContent, ButtonText, Category, CategoryWrapper, Categories, ModalWrapper, Circle } from './styled';
import { TransactionModalProps } from './types';
import { editTransaction } from '../../../../api/transaction/editTransaction';
import { useTheme } from 'styled-components/native';
import { addTransaction } from '../../../../api/transaction/addTransaction';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible, transaction } = props;
  const { categories } = useAppState();
  const { id } = transaction;
  const [title, setTitle] = useState(transaction.title);
  const [price, setPrice] = useState(transaction.price);
  const [categoryId, setCategoryId] = useState(transaction.category?.id || null);
  const [date, setDate] = useState(transaction.date ? new Date(transaction.date) : new Date());
  const dispatch = useAppDispatch();
  const { colors: { systemGray05 } } = useTheme();

  useEffect(() => {
    setTitle(transaction.title);
    setPrice(transaction.price);
    setCategoryId(transaction.category?.id || null);
    setDate(transaction.date ? new Date(transaction.date) : new Date());
  }, [visible]);

  const onEdit = async () => {
    if (!categoryId) return;
    if (id) {
      editTransaction({ id, title, categoryId, price, date }, (transaction) => {
        dispatch({ type: 'editTransaction', payload: transaction});
      });
    } else {
      addTransaction({ title, categoryId, price, date }, (transaction) => {
        dispatch({ type: 'addTransaction', payload: transaction});
      });
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ModalWrapper>
            <TouchableWithoutFeedback onPress={() => {}}>
              <ModalContent>
                <Header>
                  <Pressable onPress={() => setVisible(!visible)}>
                    <ButtonText variant="subheadlineRegular">отменить</ButtonText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      if (!categoryId) return;
                      setVisible(!visible);
                      onEdit();
                    }}
                  >
                    <ButtonText variant="subheadlineBold">сохранить</ButtonText>
                  </Pressable>
                </Header>
                <ScrollView>
                  <Content>
                    <Section>
                      <Input
                        variant="subheadlineRegular"
                        defaultValue={price === '0.00' ? '' : (+price).toString()}
                        onChangeText={price => {
                          setPrice(price);
                        }}
                        placeholder="сумма"
                        keyboardType="numeric"
                        autoFocus
                      />
                    </Section>
                    <Section>
                      <Input
                        variant="subheadlineRegular"
                        defaultValue={title}
                        onChangeText={setTitle}
                        placeholder="название"
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
                              <Circle bg={item.color || systemGray05} />
                              <Category isSelected={item.id === categoryId} variant="subheadlineRegular">
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
