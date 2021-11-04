import React, { FC, useState } from 'react';
import { Pressable, ScrollView, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Input } from '../Input';

import { Header, Content, Section, SectionGroup, ModalContent, ButtonText, ModalWrapper, NameSection } from './styled';
import { TransactionModalContentProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { PopularNames } from './components/PopularNames';

export const TransactionModalContent: FC<TransactionModalContentProps> = (props) => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    categoryId,
    setCategoryId,
    date,
    setDate,
    visible,
    onClose,
    onSave,
  } = props;
  const [focusedTitle, setFocusedTitle] = useState(false);

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
              onClose();
              onSave();
            }}
          >
            <ButtonText variant="subheadlineBold">save</ButtonText>
          </Pressable>
        </Header>
        <ScrollView>
          <Content>
            <SectionGroup>
              <NameSection>
                <Input
                  variant="subheadlineRegular"
                  defaultValue={title}
                  onChangeText={setTitle}
                  placeholder="название"
                  onFocus={() => setFocusedTitle(true)}
                  onBlur={() => setFocusedTitle(false)}
                />
              </NameSection>
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
    </ModalWrapper>
  );
};
