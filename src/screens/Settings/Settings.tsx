import React, { FC } from 'react';
import { View } from 'react-native';
import { TextVariant } from '../../components/TextVariant';
import styled from 'styled-components/native';
import css from '@styled-system/css';

const MyText = styled(TextVariant)(css({ color: 'textPrimary' }));

export const Settings: FC<any> = ({ navigation }) => {
  return (
    <View style={{ paddingLeft: 16, paddingTop: 40 }}>
      <MyText variant="bodyRegular" onPress={() => navigation.navigate('Categories')}>Categories</MyText>
    </View>
  );
};
