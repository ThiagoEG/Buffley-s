import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import { useUser } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import SideMenu from '../Componentes/SideMenu';

const { width, height } = Dimensions.get('window');

export default function Navbar({ navigation, onMenuPress  }) {
  const handleNotifications = () => {
    navigation.navigate('TelaNotificacoes');
  };
  const handleFuncionarios = () => {
    navigation.navigate('CriarFuncionario');
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const { state } = useUser(); // Obtenha o estado do usuário
  const username = state.username;

  return (
    <View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>
          {username}
        </Text>
      </View>
      <View style={styles.rightContainer}>
      <TouchableOpacity onPress={handleFuncionarios}>
            <Feather name="user-plus" size={24} marginRight={12} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={handleNotifications}>
          <Feather name="bell" size={24} marginRight={12} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onMenuPress}>
          <Feather name="menu" size={24} marginRight={12} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: height * 0.09, // Defina uma porcentagem adequada
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
