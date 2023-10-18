import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function Navbar() {
  return (
<View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>Seu Nome</Text>
      </View>
      <View style={styles.rightContainer}>
        <Feather name="bell" size={24} marginRight={12} color="black" />
        <Feather name="menu" size={24} marginRight={12} color="black" />
        <Feather name="edit" size={24} marginRight={12} color="black" />
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
