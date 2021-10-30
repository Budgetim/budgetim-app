import React, { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView, TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useUser } from '../../contexts/app';
import { Input } from '../Input';
import { editTransaction } from '../../api/transaction/editTransaction';
import { addTransaction } from '../../api/transaction/addTransaction';

import { Header, Content, Section, SectionGroup, ModalContent, ButtonText, ModalWrapper } from './styled';
import { TransactionModalProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { useTransactionsDispatch } from '../../contexts/transactions';
import { PopularNames } from './components/PopularNames';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible, transaction } = props;
  const { id } = transaction;
  const [title, setTitle] = useState(transaction.title);
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [price, setPrice] = useState(transaction.price);
  const [categoryId, setCategoryId] = useState(transaction.category?.id || null);
  const [date, setDate] = useState(transaction.date ? new Date(transaction.date) : new Date());
  const dispatch = useTransactionsDispatch();
  const { token } = useUser();

  useEffect(() => {
    if (visible) {
      setTitle(transaction.title);
      setPrice(transaction.price);
      setCategoryId(transaction.category?.id || null);
      setDate(transaction.date ? new Date(transaction.date) : new Date());
    }
  }, [visible]);

  const onEdit = async () => {
    if (id) {
      const transaction = await editTransaction({ id, title, categoryId, price, date }, token);
      dispatch({ type: 'editTransaction', payload: { transaction }})
    } else {
      const transaction = await addTransaction({ title, categoryId, price, date }, token);
      dispatch({ type: 'addTransaction', payload: { transaction }});
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
                      void onEdit();
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
                          onFocus={() => setFocusedTitle(true)}
                          onBlur={() => setFocusedTitle(false)}
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
                      <CategoriesList
                        activeCategoryId={categoryId}
                        setCategoryId={setCategoryId}
                      />
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
                {focusedTitle && (
                  <PopularNames
                    str={title}
                    selectTitle={(name) => {
                      setTitle(name);
                      Keyboard.dismiss();
                    }}
                  />
                )}
              </ModalContent>
            </TouchableWithoutFeedback>
          </ModalWrapper>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
