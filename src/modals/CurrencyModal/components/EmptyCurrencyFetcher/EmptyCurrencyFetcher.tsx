import React, { useEffect, useState } from 'react';
import { CurrencyModalContent } from '../CurrencyModalContent';
import { useAddCurrency, useEditCurrency } from '../../../../hooks/currencies';

export const EmptyCurrencyFetcher = () => {
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState<string>('');
  const { mutate: addCurrency, isSuccess, data: currencyId } = useAddCurrency();
  const editCurrency = useEditCurrency();

  useEffect(() => {
    if (isSuccess) {
      editCurrency({
        id: currencyId,
        title,
        symbol,
      });
    }
  }, [title, symbol, isSuccess]);

  useEffect(() => {
    addCurrency({ title, symbol });
  }, []);

  return <CurrencyModalContent title={title} setTitle={setTitle} symbol={symbol} setSymbol={setSymbol} />;
};
