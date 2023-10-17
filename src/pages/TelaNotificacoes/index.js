import React, { useState } from 'react';
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
  });