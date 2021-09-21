import React from 'react';
import styled from 'styled-components/native'
import { View } from 'react-native';
import { AppProvider } from './appContext';
import { TransactionsList } from './components/TransactionsList';

const Header = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.ScrollView`
  padding: 16px;
`;

export default function App() {
  return (
    <AppProvider>
      <View>
        <Header>
          <Title>расходы</Title>
        </Header>
        <Content>
          <TransactionsList />
        </Content>
      </View>
    </AppProvider>
  );
}
