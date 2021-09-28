import React from 'react';
import { Transactions } from './screens/Transactions';
import { AppProvider } from './appContext';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Categories } from './screens/Categories';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Transactions"
              component={Transactions}
              options={{
                title: 'расходы',
                tabBarLabelPosition: 'beside-icon',
                tabBarLabelStyle: { fontSize: 16 },
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="ruble-sign" color={color} size={16} />
                ),
              }}
            />
            <Tab.Screen
              name="Categories"
              component={Categories}
              options={{
                title: 'категории',
                tabBarLabelPosition: 'beside-icon',
                tabBarLabelStyle: { fontSize: 16 },
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="chart-pie" color={color} size={16} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </AppProvider>
  );
}
