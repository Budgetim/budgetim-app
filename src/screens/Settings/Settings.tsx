import React, { FC } from 'react';
import { View } from 'react-native';
import { TextVariant } from '../../components/TextVariant';
import styled from 'styled-components/native';
import css from '@styled-system/css';

const MyText = styled(TextVariant)(css({ color: 'textPrimary' }));

export const Settings: FC<any> = ({ navigation }) => {
  return (
    <View style={{ padding: 4 }}>
      <MyText variant="largeTitleBold" style={{ marginTop: 10, marginBottom: 8, color: '#fff' }}>Настройки</MyText>
      <MyText variant="bodyBold" onPress={() => navigation.navigate('Categories')}>Категории</MyText>
    </View>
  );
};
