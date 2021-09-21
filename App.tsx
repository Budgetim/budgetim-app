import React from 'react';
import styled from 'styled-components/native'
import { AppProvider } from './appContext';
import { TransactionsList } from './components/TransactionsList';
import { FormForAdding } from './components/FormForAdding';

const Container = styled.View`
  display: flex;
  height: 90%;
`;

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
      <Container>
        <Header>
          <Title>расходы</Title>
        </Header>
        <Content>
          <TransactionsList />
          <FormForAdding />
        </Content>
      </Container>
    </AppProvider>
  );
}
