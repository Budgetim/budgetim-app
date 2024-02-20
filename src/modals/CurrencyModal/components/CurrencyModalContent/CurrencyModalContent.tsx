import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import i18n from 'i18n-js';

import { Input } from '../../../../components/Input';

import { Content, Section } from './styled';
import { CurrencyModalContentProps } from './types';

export const CurrencyModalContent: FC<CurrencyModalContentProps> = props => {
  const { title, setTitle, symbol, setSymbol } = props;
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setTitleError(false);
  }, [title]);

  return (
    <ScrollView>
      <Content>
        <Section error={titleError}>
          <Input
            variant="subheadlineRegular"
            defaultValue={title}
            onChangeText={setTitle}
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
