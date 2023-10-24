import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createAppContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';

import TelaWyllian from '../pages/TelaWyllian'
import TelaNotificacoes from '../pages/TelaNotificacoes';
import Preferencias from '../pages/Preferencias'
import HomeBuffet from '../pages/HomeBuffet'
import BuffetPerfil from '../pages/BuffetPerfil'
import Funcionarios from '../pages/Funcionarios'
import Home from '../pages/Home'
import BuffetsParceiros from '../pages/BuffetsParceiros'
import Home2 from '../pages/Home2'
import Welcome from '../pages/Welcome'
import SignIn from '../pages/SignIn'
import Cardapio from '../pages/Cardapio'
import CardapiosBuffet from '../pages/CardapiosBuffet'
import TelaInicial from '../pages/TelaInicial/telaInicial'
import TelaFreelancer1 from '../pages/TelaFreelancer1'
import TelaFreelancer2 from '../pages/TelaFreelancer2'
import TelaFreelancer3 from '../pages/TelaFreelancer3'
import CriarCardapio from '../pages/CriarCardapio'
import CriarReceita from '../pages/CriarReceita'
import CriarFuncionario from '../pages/CriarFuncionario'

const iconesDasGuias = {
    Home: 'home', // Substitua 'home' pelo nome real do ícone que você deseja usar
    BuffetsParceiros: 'business', // Substitua 'person' pelo nome real do ícone que você deseja usar
    Cardapio: 'clipboard-outline', // Substitua 'settings' pelo nome real do ícone que você deseja usar
  };

  const iconesDasGuias2 = {
    HomeBuffet: 'home', // Substitua 'home' pelo nome real do ícone que você deseja usar
    CardapiosBuffet: 'business', // Substitua 'person' pelo nome real do ícone que você deseja usar
    Funcionarios: 'clipboard-outline', // Substitua 'settings' pelo nome real do ícone que você deseja usar
  };


  
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // Adicione esta linha


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

 export function HomeScreenBuffet() {
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
        <Tab.Screen name="CardapiosBuffet" component={CardapiosBuffet} options={{headerShown: false}}/>
        <Tab.Screen name="Funcionarios" component={Funcionarios} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }  

/*

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

*/
  
  /*
  
  function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreenBuffet" component={HomeScreenBuffet} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen">
        <Drawer.Screen name="Inicio" component={StackNavigator} options={{ headerShown: false }} />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="HomeScreenBuffet" component={HomeScreenBuffet} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
  
  */
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreenBuffet" component={HomeScreenBuffet} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TelaNotificacoes" component={TelaNotificacoes} options={{ headerShown: false }}/>
      <Stack.Screen name="BuffetPerfil" component={BuffetPerfil} options={{ headerShown: false }} />
      <Stack.Screen name="Preferencias" component={Preferencias} options={{ headerShown: false }} />
      <Stack.Screen name="CriarCardapio" component={CriarCardapio} options={{ headerShown: false }} />
      <Stack.Screen name="CriarReceita" component={CriarReceita} options={{ headerShown: false }} />
      <Stack.Screen name="CriarFuncionario" component={CriarFuncionario} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DrawerHomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="DrawerHomeScreenBuffet" component={HomeScreenBuffet} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

function Routes() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}



export default Routes;