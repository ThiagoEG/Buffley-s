import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../componentes2/Navbar2';
import Imagem from '../componentes2/Imagem2.js';
import Meio from '../componentes2/Meio2.js';
import Botão from '../componentes2/Botão2.js';
import Stars from '../componentes2/Stars2.js';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import SideMenu from '../Componentes/SideMenu';
import Card from '../Componentes/card';

const { width, height } = Dimensions.get('window');

export default function App() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleNotifications = () => {
    navigation.navigate('TelaNotificacoes');
  };
  const handleCriarFuncionarioNavigation = () => {
    navigation.navigate('CriarFuncionario');
  };
  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil');
  };
  return (
    <View style={styles.container}>
    <View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>Seu Nome</Text>
      </View>
      <View style={styles.rightContainer}>
      <TouchableOpacity onPress={handleCriarFuncionarioNavigation}>
            <Feather name="user-plus" size={24} marginRight={12} color="black" />
          </TouchableOpacity>
      <TouchableOpacity onPress={handleNotifications}>
            <Feather name="bell" size={24} marginRight={12} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Feather name="menu" size={24}  color="black" />
          </TouchableOpacity>

      </View>
    </View>

    <SideMenu  isVisible={menuVisible} onClose={toggleMenu}></SideMenu>
<ScrollView >

    
      <Meio/>
    </ScrollView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,  // Use width e height para tornar o tamanho responsivo
    height: '100%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: height * 0.09,  // Defina uma porcentagem adequada
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    shadowOffset: { width: 10, height: 0 },
      shadowOpacity: 5,
      shadowRadius: 2,
      elevation: 8,
  },
    
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      marginRight: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
});
