import React, { FC, useState, useLayoutEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';

import { Footer, AddButton, SettingsButton } from './styled';
import { AddTransactionModal } from './components/AddTransactionModal';
import { EditTransactionModal } from '../../components/EditTransactionModal';
import { CategoriesProvider } from '../../contexts/categories';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';
import { ModalsProvider } from '../../contexts/modals';

export const Transactions: FC<NativeStackScreenProps<StackParamList, 'Transactions'>> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { textPrimary } } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Statistics')} style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}>
          <AntDesign name="piechart" color={textPrimary} size={16} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <TransactionsProvider>
      <CategoriesProvider>
        <ModalsProvider>
          <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
              <TransactionsList />
            </ScrollView>
            <Footer>
              <AddButton onPress={() => setModalVisible(true)}>
                <AntDesign name="pluscircle" color={textPrimary} size={40} />
              </AddButton>
              <SettingsButton onPress={() => navigation.navigate('Settings')}>
                <AntDesign name="setting" color={textPrimary} size={28} />
              </SettingsButton>
            </Footer>
          </View>
          <EditTransactionModal />
          <AddTransactionModal visible={modalVisible} setVisible={setModalVisible} />
        </ModalsProvider>
      </CategoriesProvider>
    </TransactionsProvider>
  );
}
