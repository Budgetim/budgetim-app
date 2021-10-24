import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView, TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from 'styled-components/native';

import { useAppDispatch, useCategories, useUser } from '../../appContext';
import { Input } from '../Input';
import { editTransaction } from '../../api/transaction/editTransaction';
import { addTransaction } from '../../api/transaction/addTransaction';

import { Header, Content, Section, SectionGroup, ModalContent, ButtonText, Category, CategoryWrapper, Categories, ModalWrapper, Circle } from './styled';
import { TransactionModalProps } from './types';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible, transaction } = props;
  const { data: categories } = useCategories();
  const { id } = transaction;
  const [showAll, setShowAll] = useState(false);
  const [title, setTitle] = useState(transaction.title);
  const [price, setPrice] = useState(transaction.price);
  const [categoryId, setCategoryId] = useState(transaction.category?.id || null);
  const [date, setDate] = useState(transaction.date ? new Date(transaction.date) : new Date());
  const dispatch = useAppDispatch();
  const { colors: { systemGray05 } } = useTheme();
  const { token } = useUser();

  useEffect(() => {
    setTitle(transaction.title);
    setPrice(transaction.price);
    setCategoryId(transaction.category?.id || null);
    setDate(transaction.date ? new Date(transaction.date) : new Date());
  }, [visible]);

  const onEdit = async () => {
    if (id) {
      editTransaction({ id, title, categoryId, price, date }, (transaction) => {
        dispatch({ type: 'editTransaction', payload: { transaction }});
      }, token);
    } else {
      addTransaction({ title, categoryId, price, date }, (transaction) => {
        dispatch({ type: 'addTransaction', payload: { transaction }});
      }, token);
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
                    <ButtonText variant="subheadlineRegular">cancel</ButtonText>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setVisible(!visible);
                      onEdit();
                    }}
                  >
                    <ButtonText variant="subheadlineBold">save</ButtonText>
                  </Pressable>
                </Header>
                <ScrollView>
                  <Content>
                    <SectionGroup>
                      <Section style={{ flex: '1 1 auto', marginRight: 12 }}>
                        <Input
                          variant="subheadlineRegular"
                          defaultValue={title}
                          onChangeText={setTitle}
                          placeholder="название"
                        />
                      </Section>
                      <Section style={{ width: 120 }}>
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
                    </SectionGroup>
                    <Section>
                      <Categories>
                        {categories.slice(0, showAll ? categories.length : 5).map((item, index, array) => {
                          return (
                            <CategoryWrapper
                              key={item.id}
                              hasBorder={index !== array.length - 1}
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
                        <CategoryWrapper hasBorder={false} onPress={() => setShowAll(!showAll)}>
                          <Category isSelected={false} variant="subheadlineRegular">
                            {showAll ? 'hide' : 'more'}
                          </Category>
                        </CategoryWrapper>
                      </Categories>
                    </Section>
                    <Section>
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
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
