import React, { FC, useState } from 'react';
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

import { Header, Content, Section, ModalContent, ButtonText, Category, CategoryWrapper, Categories, ModalWrapper } from './styled';
import { TransactionModalProps } from './types';
import { editTransaction } from '../../../../api/transaction/editTransaction';

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const { visible, setVisible } = props;
  const { categories } = useAppState();
  const { id } = props;
  const [title, setTitle] = useState(props.title);
  const [price, setPrice] = useState(props.price);
  const [categoryId, setCategoryId] = useState(props.category.id);
  const [date, setDate] = useState(new Date(props.date));
  const dispatch = useAppDispatch();

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
                      defaultValue={title}
                      onChangeText={setTitle}
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
                  <Section>
                    <Input
                      variant="subheadlineRegular"
                      defaultValue={price === '0.00' ? '' : (+price).toString()}
                      onChangeText={price => {
                        setPrice(price);
                      }}
                      placeholder="сумма"
                      keyboardType="numeric"
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
