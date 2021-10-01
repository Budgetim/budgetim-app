import React, { useEffect, useState } from 'react';
import { TransactionsList } from './components/TransactionsList';
import { Button, ScrollView, TouchableOpacity, View } from 'react-native';
import { TransactionModal } from './components/TransactionModal/TransactionModal';
import { getCategories } from '../../api/category/getCategories';
import { useAppDispatch } from '../../appContext';
import { Footer, AddButton, SettingsButton } from './styled';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'styled-components/native';

export const Transactions = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { textPrimary } } = useTheme();
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate('Login')} title="Войти" />
      )
    });
  }, [navigation]);

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
          <AntDesign name="setting" color={textPrimary} size={32} />
        </SettingsButton>
      </Footer>
    </View>
  );
};
