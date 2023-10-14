import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeBuffet from '../pages/HomeBuffet'
import TelaLucas1 from '../pages/TelaLucas1'
import TelaLucas2 from '../pages/TelaLucas2'
import Home from '../pages/Home'
import BuffetsParceiros from '../pages/BuffetsParceiros'
import Home2 from '../pages/Home2'
import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Cardapio from '../pages/Cardapio'
import TelaInicial from '../pages/TelaInicial/telaInicial'
import TelaFreelancer1 from '../pages/TelaFreelancer1'
import TelaFreelancer2 from '../pages/TelaFreelancer2'
import TelaFreelancer3 from '../pages/TelaFreelancer3'

const iconesDasGuias = {
    Home: 'home', // Substitua 'home' pelo nome real do ícone que você deseja usar
    BuffetsParceiros: 'business', // Substitua 'person' pelo nome real do ícone que você deseja usar
    Cardapio: 'clipboard-outline', // Substitua 'settings' pelo nome real do ícone que você deseja usar
  };

  const iconesDasGuias2 = {
    HomeBuffet: 'home', // Substitua 'home' pelo nome real do ícone que você deseja usar
    TelaLucas1: 'business', // Substitua 'person' pelo nome real do ícone que você deseja usar
    TelaLucas2: 'clipboard-outline', // Substitua 'settings' pelo nome real do ícone que você deseja usar
  };


  
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route  }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = iconesDasGuias[route.name];
            
            // Você pode personalizar a cor e o tamanho do ícone com base em 'focused' aqui
            // Por exemplo:
            // const corDoIcone = focused ? 'azul' : 'cinza';
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name="BuffetsParceiros" component={BuffetsParceiros} options={{headerShown: false}}/>
        <Tab.Screen name="Cardapio" component={Cardapio} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }

  function HomeScreenBuffet() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route  }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = iconesDasGuias2[route.name];
            
            // Você pode personalizar a cor e o tamanho do ícone com base em 'focused' aqui
            // Por exemplo:
            // const corDoIcone = focused ? 'azul' : 'cinza';
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="HomeBuffet" component={HomeBuffet} options={{headerShown: false}}/>
        <Tab.Screen name="TelaLucas1" component={TelaLucas1} options={{headerShown: false}}/>
        <Tab.Screen name="TelaLucas2" component={TelaLucas2} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }  


  
  

function Routes(props)
{
    return(
        <NavigationContainer>
            <Stack.Navigator>
            

                        <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{headerShown: false}}
            />

<Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{headerShown: false}}
            />

                                                <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
                
            />
                                                            <Stack.Screen
                name="HomeScreenBuffet"
                component={HomeScreenBuffet}
                options={{headerShown: false}}
                
            />
            



            


        </Stack.Navigator>
        </NavigationContainer>
        
    )    
    
}

export default Routes;