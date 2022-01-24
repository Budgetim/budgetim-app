import { NativeStackScreenProps } from '@react-navigation/native-stack';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { NoDataMessage } from '../../components/NoDataMessage';
import { TabsGroup } from '../../components/TabsGroup';

import { useUserState } from '../../contexts/user';
import { Loader } from '../../components/Loader';
import { getAvailableMonths } from '../../api/transactions/getAvailableMonths';
import { StackParamList } from '../types';
import { StatisticsInfo } from './StatisticsInfo';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { Tabs, Container } from './styled';

export const StatisticsByDates: FC<NativeStackScreenProps<StackParamList, 'StatisticsByDates'>> = () => {
  const { token } = useUserState();
  const [activeMode, setActiveMode] = useState(2);
  const [data, setData] = useState<{ data: any[] } | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [indexDate, setIndexDate] = useState(0);

  useErrorHandler(error);

  const getAvailableDates = async () => {
    setLoading(true);
    try {
      const result = await getAvailableMonths(token);
      setData(result);
      setIndexDate(result.data.length - 1);
    } catch (error) {
      setError(error);
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

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
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
      {/*<Tabs>*/}
      {/*  <TabsGroup*/}
      {/*    activeIndex={activeMode}*/}
      {/*    onChangeIndex={setActiveMode}*/}
      {/*    data={[*/}
      {/*      { title: i18n.t('statistics.periods.variants.days'), disabled: true },*/}
      {/*      { title: i18n.t('statistics.periods.variants.weeks'), disabled: true },*/}
      {/*      { title: i18n.t('statistics.periods.variants.months') },*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</Tabs>*/}
      <StatisticsInfo
        year={dates[indexDate].year}
        month={dates[indexDate].month}
        setNextDate={indexDate !== dates.length - 1 ? setNextMonth : undefined}
        setPrevDate={indexDate !== 0 ? setPrevMonth : undefined}
      />
    </Container>
  );
};
