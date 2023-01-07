import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import { NoDataMessage } from '../../components/NoDataMessage';
import { TabsGroup } from '../../components/TabsGroup';

import { Loader } from '../../components/Loader';
import { getAvailableMonths } from '../../api/transactions/getAvailableMonths';
import { StackParamList } from '../types';
import { StatisticsInfo } from './StatisticsInfo';
import { Tabs, Container } from './styled';
import { getUsedCurrencies } from '../../api/transactions';
import { Currency } from '../../types';

export const StatisticsByDates: FC<NativeStackScreenProps<StackParamList, 'StatisticsByDates'>> = () => {
  const [activeMode, setActiveMode] = useState(0);
  const [data, setData] = useState<{ data: any[] } | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setLoading] = useState(true);

  const [indexDate, setIndexDate] = useState(0);

  const getAvailableDates = async () => {
    setLoading(true);
    try {
      const result = await getAvailableMonths();
      const currenciesData = await getUsedCurrencies();
      setCurrencies(currenciesData);
      setData(result);
      setIndexDate(result.data.length - 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getAvailableDates();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const { data: dates } = data;

  if (!dates.length) {
    return <NoDataMessage>{i18n.t('statistics.messages.noData')} 👀</NoDataMessage>;
  }

  const setPrevMonth = () => {
    setIndexDate(indexDate - 1);
  };

  const setNextMonth = () => {
    setIndexDate(indexDate + 1);
  };

  return (
    <Container>
      {currencies.length > 1 && (
        <Tabs>
          <TabsGroup
            activeIndex={activeMode}
            onChangeIndex={setActiveMode}
            data={currencies.map(currency => ({ title: currency.symbol }))}
          />
        </Tabs>
      )}
      <StatisticsInfo
        year={dates[indexDate].year}
        month={dates[indexDate].month}
        currencyId={currencies[activeMode].id}
        setNextDate={indexDate !== dates.length - 1 ? setNextMonth : undefined}
        setPrevDate={indexDate !== 0 ? setPrevMonth : undefined}
      />
    </Container>
  );
};
