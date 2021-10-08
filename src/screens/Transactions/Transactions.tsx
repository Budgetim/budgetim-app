import React, { FC, useEffect, useState, useLayoutEffect } from 'react';
import { TransactionsList } from './components/TransactionsList';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getCategories } from '../../api/category/getCategories';
import { useAppDispatch } from '../../appContext';
import { StackParamList } from '../types';

import { TransactionModal } from './components/TransactionModal';
import { Footer, AddButton, SettingsButton } from './styled';

export const Transactions: FC<NativeStackScreenProps<StackParamList, 'Transactions'>> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { textPrimary } } = useTheme();
  const dispatch = useAppDispatch();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}>
  //         <Ionicons name="person" color={textPrimary} size={16} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);

  const getData = async () => {
    getCategories((categories) => {
      dispatch({ type: 'setCategories', payload: { data: categories }});
    }, (error) => {
      dispatch({ type: 'setErrorCategories', payload: { error }});
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
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
  );
};
