import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Navbar from '../componentes2/Navbar2';
import Imagem from '../componentes2/Imagem2.js';
import Meio from '../componentes2/Meio2.js';
import Botão from '../componentes2/Botão2.js';
import Stars from '../componentes2/Stars2.js';

export default function App() {
  return (
    <ScrollView style={{margin: 0, backgroundColor: 'white'}}>
      <Navbar/>
      <Meio/>
    </ScrollView>
  );
}

