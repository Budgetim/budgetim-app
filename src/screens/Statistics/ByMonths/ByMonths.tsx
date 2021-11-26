import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ErrorMessage } from '../../../components/ErrorMessage';

import { useUserState } from '../../../contexts/user';
import { TextVariant } from '../../../components/TextVariant';
import { Loader } from '../../../components/Loader';
import { getAvailableMonths } from '../../../api/transactions/getAvailableMonths';
import { StatisticsInfo } from '../StatisticsInfo';
import { useErrorHandler } from '../../../hooks/useErrorHandler';

export const ByMonths: FC = () => {
  const { token } = useUserState();
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
    return <ErrorMessage>{error}</ErrorMessage>
  }

  if (!data) {
    return null;
  }

  const { data: dates } = data;

  if (!dates.length) {
    // TODO: заглушка
    return (
      <View>
        <TextVariant variant="bodyRegular">No data to build statistics</TextVariant>
      </View>
    );
  }

  const setPrevMonth = () => {
    setIndexDate(indexDate - 1);
  };

  const setNextMonth = () => {
    setIndexDate(indexDate + 1);
  };

  return (
    <StatisticsInfo
      year={dates[indexDate].year}
      month={dates[indexDate].month}
      setNextDate={indexDate !== dates.length - 1 ? setNextMonth : undefined}
      setPrevDate={indexDate !== 0 ? setPrevMonth : undefined}
    />
  );
};
