/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions  } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from '../Componentes/Navbar';

const { width, height } = Dimensions.get('window');

export default function TelaNotificacoes() 
{
    <View style={styles.container}>
        <Navbar></Navbar>

    </View>
}

const styles = StyleSheet.create({
    container: {
flex:1,
backgroundColor: 'white'
    },
  });*/

  import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput } from 'react-native';
import { Feather, FontAwesome, MaterialIcons,  } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Navbar from '../Componentes/Navbar';
//import Navbar2 from '../componentes2/Navbar2'
const { width, height } = Dimensions.get('window');


export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="Pesquisar..."
          style={styles.searchInput}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
            },
            searchContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: height * 0.03,  // Porcentagem em relação à altura
                marginHorizontal: width * 0.05,  // Porcentagem em relação à largura
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: 'white',
                borderRadius: 10,
                shadowOffset: { width: 10, height: 0 },
                shadowOpacity: 5,
                shadowRadius: 2,
                elevation: 8,
              },
              searchInput: {
                flex: 1,
                marginLeft: 10,
                fontSize: 16,
              },
            
});
