import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../Componentes/Navbar';
import Imagem from '../Componentes/Imagem';
import Stars from '../Componentes/Stars';
import CardCardapio from '../componentes2/CardCardapio';

export default function App() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Preferencias');
  };

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../../../assets/Frame4.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
  buttonContainer: {
    alignItems: 'center',
    margin: 16,
  },
});
