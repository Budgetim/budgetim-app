import React, { FC, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlusIcon } from '../../icons/PlusIcon';

import { StackParamList } from '../types';

import { CategoriesList } from './components/CategoriesList';
import { CategoriesProvider } from '../../contexts/categories';
import { AddCategoryModal } from './components/AddCategoryModal';
import { EditCategoryModal } from './components/EditCategoryModal';

export const Categories: FC<NativeStackScreenProps<StackParamList, 'Categories'>> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    colors: { systemBlue },
  } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}
        >
          <PlusIcon color={systemBlue} size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <CategoriesProvider>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <CategoriesList />
        <AddCategoryModal visible={modalVisible} setVisible={setModalVisible} />
        <EditCategoryModal />
      </ScrollView>
    </CategoriesProvider>
  );
};
