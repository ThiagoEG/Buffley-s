import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import Navbar from '../Componentes/Navbar';
import Imagem from '../Componentes/Imagem';
import Botão from '../Componentes/Botão';
import Stars from '../Componentes/Stars';
import CardCardapio from '../componentes2/CardCardapio';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <Imagem />
      <Stars />
      <Text style={styles.title}>Art's Fia Buffet</Text>
      <Text style={styles.subtitle}>Cardápios Disponíveis</Text>
      <CardCardapio />
      <CardCardapio />
      <CardCardapio />
      <Botão />
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: 'bold',
    margin: 16,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
    margin: 16,
  },

});
