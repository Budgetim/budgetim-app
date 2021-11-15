import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';
import { Container } from './styled';
import { SelectList } from '../../components/SelectList';
import { Loader } from '../../components/Loader';
import { TextVariant } from '../../components/TextVariant';
import { getCurrencies } from '../../api/currency/getCurrencies';
import { Currency as CurrencyType } from '../../types';
import { useUserDispatch, useUserState } from '../../contexts/user';
import { updateCurrency } from '../../api/user/updateCurrency';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const Currency: FC<NativeStackScreenProps<StackParamList, 'Currency'>> = () => {
  const { currency, token } = useUserState();
  const [data, setData] = useState<CurrencyType[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useUserDispatch();

  useErrorHandler(error);

  const getData = async () => {
    setLoading(true);
    try {
      const result = await getCurrencies();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getData();
  }, []);

  const setCurrency = async (id: number) => {
    try {
      const user = await updateCurrency({ currencyId: id }, token);
      dispatch({ type: 'setUser', payload: { user } });
    } catch (error) {
      setError(error);
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <TextVariant variant="subheadlineBold">{error}</TextVariant>;
  }

  if (!data) {
    return null;
  }

  return (
    <Container>
      <SelectList
        onSelect={(id) => setCurrency(id)}
        data={data.map(item => {
          return {
            ...item,
            isActive: item.id === currency?.id,
          };
        })}
      />
    </Container>
  );
};
