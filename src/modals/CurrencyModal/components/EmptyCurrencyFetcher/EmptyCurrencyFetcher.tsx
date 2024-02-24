import React, { FC } from 'react';
import { useAddCurrency, useGetCurrencies } from '../../../../hooks/currencies';
import { ScrollView, TouchableHighlight } from 'react-native';
import { Content, Section } from './styled';
import { MixedList } from '../../../../components/MixedList';
import { currencies } from '../../../../constants/currencies';
import i18n from 'i18n-js';
import { Loader } from '../../../../components/Loader';

type EmptyCurrencyFetcherProps = {
  onClose: () => void;
};

export const EmptyCurrencyFetcher: FC<EmptyCurrencyFetcherProps> = ({ onClose }) => {
  const { data, isLoading } = useGetCurrencies();
  const { mutate: addCurrency } = useAddCurrency();
  if (isLoading) {
    return <Loader />;
  }

  const currencyKeys = data.map(item => item.title);

  const currenciesList = Object.keys(currencies).filter(key => !currencyKeys.includes(key));

  return (
    <ScrollView>
      <TouchableHighlight>
        <Content>
          <Section>
            <MixedList
              data={currenciesList.map(code => {
                return {
                  id: code,
                  title: code,
                  titleColor: 'textPrimary',
                  subtitle: i18n.t(`currencies.codes.${code}`),
                  rightText: currencies[code].symbol,
                  onPress: () => {
                    addCurrency({ title: code });
                    onClose();
                  },
                };
              })}
            />
          </Section>
        </Content>
      </TouchableHighlight>
    </ScrollView>
  );
};
