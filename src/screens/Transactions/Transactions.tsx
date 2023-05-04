import React, { FC, useState, useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChartPieIcon } from '../../icons/ChartPieIcon';
import { PlusCircleIcon } from '../../icons/PlusCircleIcon';
import { SettingIcon } from '../../icons/SettingIcon';

import { StackParamList } from '../types';

import { Footer, AddButton, SettingsButton } from './styled';
import { AddTransactionModal } from './components/AddTransactionModal';
import { EditTransactionModal } from '../../components/EditTransactionModal';
import { TransactionsList } from '../../components/TransactionsList';

export const Transactions: FC<NativeStackScreenProps<StackParamList, 'Transactions'>> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    colors: { textPrimary },
  } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('StatisticsByDates')}
          style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}
        >
          <ChartPieIcon color={textPrimary} size={16} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <TransactionsList />
        </ScrollView>
        <Footer>
          <AddButton onPress={() => setModalVisible(true)}>
            <PlusCircleIcon color={textPrimary} size={44} />
          </AddButton>
          <SettingsButton onPress={() => navigation.navigate('Categories')}>
            <SettingIcon color={textPrimary} size={30} />
          </SettingsButton>
        </Footer>
      </View>
      <EditTransactionModal />
      <AddTransactionModal visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};
