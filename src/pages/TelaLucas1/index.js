import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Navbar from '../Componentes/Navbar';
import Imagem from '../Componentes/Imagem';
import Botão from '../Componentes/Botão';
import Stars from '../Componentes/Stars';
import CardCardapio from '../componentes2/CardCardapio';

export default function App() {
  return (
    <ScrollView style={{margin: 0}}>
      <Navbar/>
      <Imagem/>
      <Stars/>
      <Text style={{fontSize: 32, marginTop: 16, fontWeight: 'bold', marginLeft: 16}}>Art's Fia Buffet</Text>
      <Text style={{fontSize: 20, marginTop: 16, marginLeft: 16}}>Cardápios Disponível</Text>
      <CardCardapio/>
      <CardCardapio/>
      <CardCardapio/>
      <Botão/>
    </ScrollView>
  );
}

