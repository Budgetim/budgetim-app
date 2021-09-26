import React, { FC } from 'react';
import { View, Button } from 'react-native';

export const Home: FC<any> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="расходы"
        onPress={() => navigation.navigate('Transactions')}
      />
      <Button
        title="категории"
        onPress={() => navigation.navigate('Categories')}
      />
    </View>
  );
};
