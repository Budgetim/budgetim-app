import React, { FC, useEffect, useState } from 'react';
import { ScrollView, Keyboard, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import i18n from 'i18n-js';
import { locale } from 'expo-localization';

import { Input } from '../../../../components/Input';

import { Content, Section, SectionGroup, NameSection } from './styled';
import { TransactionModalContentProps } from './types';
import { CategoriesList } from './components/CategoriesList';
import { PopularNames } from './components/PopularNames';
import { separateThousands } from '../../../../utils/separateThousands';
import { CurrenciesList } from './components/CurrenciesList';
import { formatNumberForServer } from '../../../../utils/formatNumberForServer';
import { CategoryModal } from '../../../CategoryModal';

export const TransactionModalContent: FC<TransactionModalContentProps> = props => {
  const { title, setTitle, price, setPrice, categoryId, setCategoryId, currencyId, setCurrencyId, date, setDate } =
    props;
  const [focusedTitle, setFocusedTitle] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  return (
    <>
      <ScrollView>
        <TouchableHighlight>
          <Content>
            <SectionGroup>
              <NameSection error={titleError}>
                <Input
                  variant="subheadlineRegular"
                  defaultValue={title}
                  onChangeText={setTitle}
                  placeholder={i18n.t('transactions.form.title')}
                  onFocus={() => setFocusedTitle(true)}
                  onBlur={() => setFocusedTitle(false)}
                />
              </NameSection>
              <Section style={{ width: 120 }}>
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
            </SectionGroup>
            <Section>
              <CategoriesList activeCategoryId={categoryId} setCategoryId={setCategoryId} />
            </Section>
            <Section>
              <CurrenciesList activeCurrencyId={currencyId} setCurrencyId={setCurrencyId} />
            </Section>
            <DateTimePicker
              locale={locale}
              value={date}
              mode="date"
              display="spinner"
              onChange={(_event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
              }}
              maximumDate={new Date()}
            />
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
    </>
  );
};
