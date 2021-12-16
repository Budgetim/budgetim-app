import React, { FC, useState } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlusIcon } from '../../icons/PlusIcon';

import { StackParamList } from '../types';

import { CategoriesList } from './components/CategoriesList';
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
    <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 40 }}>
      <CategoriesList />
      <AddCategoryModal visible={modalVisible} setVisible={setModalVisible} />
      <EditCategoryModal />
    </ScrollView>
  );
};
