import i18n from 'i18n-js';
import React, { FC } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from './styled';

import { StackParamList } from '../types';
import { TextVariant } from '../../components/TextVariant';

export const Error: FC<NativeStackScreenProps<StackParamList, 'Error'>> = () => {
  return (
    <Container>
      <TextVariant variant="bodyRegular">{i18n.t('common.errors.notAvailable')}</TextVariant>
    </Container>
  );
};
