import React, { FC, useState } from 'react';
import { Pressable, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Input } from '../Input';
import en from '../../lang/en.json';

import { Header, Content, Section, SectionGroup, ModalContent, ButtonText, ModalWrapper, NameSection } from './styled';
import { TransactionModalContentProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { PopularNames } from './components/PopularNames';
import { formatNumberWithSign } from '../../utils/formatNumberWithSign';

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
    isLoading,
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
            <ButtonText variant="subheadlineRegular">{en.common.action.cancel}</ButtonText>
          </Pressable>
          <Pressable
            style={{ display: 'flex', flexDirection: 'row' }}
            onPress={onSave}
          >
            {isLoading ? <ActivityIndicator /> : <ButtonText variant="subheadlineBold">{en.common.action.done}</ButtonText>}
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
                  placeholder={en.transactions.form.title}
                  onFocus={() => setFocusedTitle(true)}
                  onBlur={() => setFocusedTitle(false)}
                />
              </NameSection>
              <Section style={{ width: 120 }}>
                <Input
                  variant="subheadlineRegular"
                  onChangeText={p => {
                    if (p === '' || /^((\d|\s)+),?(\d{1,2})?$/.test(p)) {
                      setPrice(formatNumberWithSign(p));
                    }
                  }}
                  value={formatNumberWithSign(price)}
                  placeholder={en.transactions.form.price}
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
