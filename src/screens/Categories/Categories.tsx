import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { CategoriesList } from './components/CategoriesList';
import { CategoryModal } from './components/CategoryModal';
import { useTheme } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Categories = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors: { systemBlue } } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 4, paddingBottom: 4 }}>
          <Feather name="plus" color={systemBlue} size={32} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <CategoriesList />
      <CategoryModal category={{ title: '', description: '', color: '' }} visible={modalVisible} setVisible={setModalVisible} />
    </ScrollView>
  );
};
