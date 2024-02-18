import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import i18n from 'i18n-js';

import { Input } from '../../../../components/Input';

import { Content, Section } from './styled';
import { CurrencyModalContentProps } from './types';

export const CurrencyModalContent: FC<CurrencyModalContentProps> = props => {
  const { name, setName, symbol, setSymbol } = props;
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    setNameError(false);
  }, [name]);

  return (
    <ScrollView>
      <Content>
        <Section error={nameError}>
          <Input
            variant="subheadlineRegular"
            defaultValue={name}
            onChangeText={setName}
            placeholder={i18n.t('currencies.form.name')}
          />
        </Section>
        <Section>
          <Input
            variant="subheadlineRegular"
            defaultValue={symbol || ''}
            onChangeText={setSymbol}
            placeholder={i18n.t('currencies.form.symbol')}
          />
        </Section>
      </Content>
    </ScrollView>
  );
};
