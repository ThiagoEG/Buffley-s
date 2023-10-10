/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import TelaInicial from '../pages/TelaInicial/telaInicial'

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'SignIn') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Welcome') {
              iconName = focused ? 'ios-options' : 'ios-options-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        
        <Tab.Screen name="SignIn" component={SignIn} />
        <Tab.Screen name="Welcome" component={Welcome} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNavigator;

/*import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Cardapio from '../pages/Cardapio';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Welcome') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'SignIn') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Cardapio') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="Cardapio" component={Cardapio} />
    </Tab.Navigator>
  );
};
*/