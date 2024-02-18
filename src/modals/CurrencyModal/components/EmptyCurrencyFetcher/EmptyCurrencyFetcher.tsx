import React, { useEffect, useState } from 'react';
import { CurrencyModalContent } from '../CurrencyModalContent';
import { useAddCurrency, useEditCurrency } from '../../../../hooks/currencies';

export const EmptyCurrencyFetcher = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState<string>('');
  const { mutate: addCurrency, isSuccess, data: currencyId } = useAddCurrency();
  const editCurrency = useEditCurrency();

  useEffect(() => {
    if (isSuccess) {
      editCurrency({
        id: currencyId,
        code: name,
        symbol,
      });
    }
  }, [name, symbol, isSuccess]);

  useEffect(() => {
    addCurrency({ code: name || 'новая валюта', symbol: symbol || '@' });
  }, []);

  return <CurrencyModalContent name={name} setName={setName} symbol={symbol} setSymbol={setSymbol} />;
};
