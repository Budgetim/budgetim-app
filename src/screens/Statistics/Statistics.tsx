import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { useUser } from '../../contexts/app';

import { TextVariant } from '../../components/TextVariant';
import { Loader } from '../../components/Loader';
import { getAvailableMonths } from '../../api/transaction/getAvailableMonths';
import { StatisticsInfo } from './StatisticsInfo';

export interface StatisticsItem {
  color: string;
  description: string;
  id: number;
  sum: string;
  title: string;
}

export const Statistics: FC<NativeStackScreenProps<StackParamList, 'Statistics'>> = () => {
  const {token} = useUser();
  const [data, setData] = useState<{ data: any[] } | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [indexDate, setIndexDate] = useState(0);

  const getAvailableDates = async () => {
    setLoading(true);
    try {
      const result = await getAvailableMonths(token);
      setData(result as any);
      setIndexDate(result.data.length - 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    void getAvailableDates();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <TextVariant variant="subheadlineBold">{error}</TextVariant>;
  }

  if (!data) {
    return null;
  }

  const { data: dates } = data;

  const setPrevMonth = () => {
    if (indexDate === 0) {
      return;
    }
    setIndexDate(indexDate - 1);
  };

  const setNextMonth = () => {
    if (indexDate === dates.length - 1) {
      return;
    }
    setIndexDate(indexDate + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatisticsInfo
        year={dates[indexDate].year}
        month={dates[indexDate].month}
        setNextDate={setNextMonth}
        setPrevDate={setPrevMonth}
      />
    </View>
  );
};
