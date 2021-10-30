import React, { FC, useState, useLayoutEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../types';

import { Footer, AddButton, SettingsButton } from './styled';
import { TransactionModal } from '../../components/TransactionModal';
import { CategoriesProvider } from '../../contexts/categories';
import { TransactionsProvider } from '../../contexts/transactions';
import { TransactionsList } from '../../components/TransactionsList';

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
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TransactionsList />
            <TransactionModal
              transaction={{ title: '', category: null, price: '0.00', date: null }}
              visible={modalVisible}
              setVisible={setModalVisible}
            />
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
      </CategoriesProvider>
    </TransactionsProvider>
  );
}
