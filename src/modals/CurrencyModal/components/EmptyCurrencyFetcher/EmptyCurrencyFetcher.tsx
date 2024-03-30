import React, { FC, useEffect, useState } from 'react';
import { useAddCurrency, useGetCurrencies } from '../../../../hooks/currencies';
import { ScrollView, TouchableHighlight } from 'react-native';
import { Content, Section } from './styled';
import { MixedList } from '../../../../components/MixedList';
import { currencies } from '../../../../constants/currencies';
import i18n from 'i18n-js';
import { Loader } from '../../../../components/Loader';
import { SubscribeWidget } from '../../../../components/SubscribeWidget';
import { storage } from '../../../../storage';

type EmptyCurrencyFetcherProps = {
  onClose: () => void;
};

const getFromStorage = () => {
  return new Promise(resolve => {
    storage
      .load({
        key: 'subscribe',
        id: 'month',
      })
      .then(data => {
        resolve(data);
      })
      .catch(() => {
        resolve(null);
      });
  });
};

export const EmptyCurrencyFetcher: FC<EmptyCurrencyFetcherProps> = ({ onClose }) => {
  const { data, isLoading } = useGetCurrencies();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const { mutate: addCurrency } = useAddCurrency();

  useEffect(async () => {
    const dataStorage = await getFromStorage();
    setSubscribeStatus(dataStorage);
    setLoadingStatus(false);
  }, []);

  if (isLoading || loadingStatus) {
    return <Loader />;
  }

  const currencyKeys = data.map(item => item.title);

  if (data?.length > 2 && !subscribeStatus) {
    return (
      <ScrollView>
        <TouchableHighlight>
          <Content>
            <SubscribeWidget />
          </Content>
        </TouchableHighlight>
      </ScrollView>
    );
  }

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
