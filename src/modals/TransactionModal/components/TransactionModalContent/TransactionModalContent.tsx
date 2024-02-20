import React, { FC, useEffect, useState } from 'react';
import { ScrollView, Keyboard, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from 'i18n-js';
import { locale } from 'expo-localization';

import { Input } from '../../../../components/Input';

import { Content, Section } from './styled';
import { TransactionModalContentProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { PopularNames } from './components/PopularNames';
import { separateThousands } from '../../../../utils/separateThousands';
import { CurrenciesList } from './components/CurrenciesList';
import { formatNumberForServer } from '../../../../utils/formatNumberForServer';
import { CategoryModal } from '../../../CategoryModal';
import { MixedList } from '../../../../components/MixedList';
import { ModalWrapper } from '../../../ModalWrapper';
import format from 'date-fns/format';
import { CurrencyModal } from '../../../CurrencyModal';

export const TransactionModalContent: FC<TransactionModalContentProps> = props => {
  const { title, setTitle, price, setPrice, categoryId, setCategoryId, currencyId, setCurrencyId, date, setDate } =
    props;
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [dateModalIsOpen, setDateModalIsOpen] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  return (
    <>
      <ScrollView>
        <TouchableHighlight>
          <Content>
            <Section error={titleError}>
              <Input
                variant="subheadlineRegular"
                defaultValue={title}
                onChangeText={setTitle}
                placeholder={i18n.t('transactions.form.title')}
                onFocus={() => setFocusedTitle(true)}
                onBlur={() => setFocusedTitle(false)}
              />
            </Section>
            <Section>
              <Input
                variant="subheadlineRegular"
                onChangeText={p => {
                  if (p === '' || /^((\d|\s)+),?(\d{1,2})?$/.test(p)) {
                    setPrice(+formatNumberForServer(p));
                  }
                }}
                value={separateThousands(price)}
                placeholder={i18n.t('transactions.form.price')}
                keyboardType="numeric"
                autoFocus
              />
            </Section>

            <Section>
              <CategoriesList
                activeCategoryId={categoryId}
                setCategoryId={id => setCategoryId(categoryId === id ? null : id)}
              />
            </Section>
            <Section>
              <CurrenciesList activeCurrencyId={currencyId} setCurrencyId={setCurrencyId} />
            </Section>
            <Section>
              <MixedList
                data={[
                  {
                    id: 1,
                    title: i18n.t('transactions.form.date'),
                    titleColor: 'textPrimary',
                    hasArrow: true,
                    rightText: format(date, 'dd.MM.yyyy'),
                    onPress: () => setDateModalIsOpen(true),
                  },
                ]}
              />
            </Section>
          </Content>
        </TouchableHighlight>
      </ScrollView>
      {focusedTitle && (
        <PopularNames
          str={title}
          selectTitle={name => {
            setTitle(name);
            Keyboard.dismiss();
          }}
        />
      )}
      <CategoryModal />
      <CurrencyModal />
      <ModalWrapper isVisible={dateModalIsOpen} onClose={() => setDateModalIsOpen(false)} height="shirt">
        <DateTimePicker
          locale={locale}
          value={date}
          mode="date"
          display="inline"
          onChange={(_event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setDateModalIsOpen(false);
          }}
          maximumDate={new Date()}
        />
      </ModalWrapper>
    </>
  );
};
