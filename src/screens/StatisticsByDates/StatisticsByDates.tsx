import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import { NoDataMessage } from '../../components/NoDataMessage';
import { TabsGroup } from '../../components/TabsGroup';
import { Loader } from '../../components/Loader';
import { useGetAvailableMonths } from '../../hooks/transactions';
import { useGetUsedCurrencies } from '../../hooks/currencies';
import { StackParamList } from '../types';
import { StatisticsInfo } from './StatisticsInfo';
import { Tabs, Container } from './styled';

export const StatisticsByDates: FC<NativeStackScreenProps<StackParamList, 'StatisticsByDates'>> = () => {
  const [activeMode, setActiveMode] = useState(0);
  const [indexDate, setIndexDate] = useState(0);
  const { data, isLoading: isLoadingData } = useGetAvailableMonths();
  const { data: currencies, isLoading: isLoadingCurrencies } = useGetUsedCurrencies();

  useEffect(() => {
    if (data) {
      setIndexDate(data.length - 1);
    }
  }, [data]);

  if (isLoadingData || isLoadingCurrencies) {
    return <Loader />;
  }

  if (!data || !currencies || !data[indexDate]) {
    return null;
  }

  if (!data.length) {
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
        year={data[indexDate].year}
        month={data[indexDate].month}
        currencyId={currencies[activeMode].id}
        setNextDate={indexDate !== data.length - 1 ? setNextMonth : undefined}
        setPrevDate={indexDate !== 0 ? setPrevMonth : undefined}
      />
    </Container>
  );
};
