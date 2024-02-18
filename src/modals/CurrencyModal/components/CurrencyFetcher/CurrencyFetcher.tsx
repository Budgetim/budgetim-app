import React, { FC, useEffect, useState } from 'react';
import { Loader } from '../../../../components/Loader';
import i18n from 'i18n-js';
import { ErrorMessage } from '../../../../components/ErrorMessage';
import { CurrencyModalContent } from '../CurrencyModalContent';
import { useEditCurrency, useGetCurrency } from '../../../../hooks/currencies';
import { Currency } from '../../../../types';

interface ContentProps {
  currency: Currency;
}

export const Content: FC<ContentProps> = ({ currency }) => {
  const [name, setName] = useState(currency.code);
  const [symbol, setSymbol] = useState(currency.symbol);
  const editCurrency = useEditCurrency();

  useEffect(() => {
    editCurrency({
      id: currency.id,
      code: name,
      symbol,
    });
  }, [name, symbol]);

  return <CurrencyModalContent name={name} setName={setName} symbol={symbol} setSymbol={setSymbol} />;
};

interface CurrencyFetcherProps {
  id: number;
}

export const CurrencyFetcher: FC<CurrencyFetcherProps> = ({ id }) => {
  const { data, isLoading, error } = useGetCurrency(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorMessage>{error || i18n.t('common.state.error')}</ErrorMessage>;
  }

  return <Content currency={data} />;
};
