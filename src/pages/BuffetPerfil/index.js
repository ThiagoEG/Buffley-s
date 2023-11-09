import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from '../Componentes/Navbar';
import Imagem from '../Componentes/Imagem';
import Stars from '../Componentes/Stars';
import CardCardapio from '../componentes2/CardCardapio';

import calcularMediaAvaliacoes from '../../services/Globals/calculoMediaAvaliacoes';

export default function BuffetPerfil() {
  const navigation = useNavigation();
  const route = useRoute();

  const { buffetData } = route.params;

  // Estado para armazenar a média das avaliações
  const {mediaAvaliacoes} = route.params;

  const handlePress = () => {
    navigation.navigate('Preferencias');
  };

  // Use useEffect para calcular a média das avaliações quando o componente for montado
  useEffect(() => {
    const calcularMedia = async () => {
      // Chame a função para calcular a média
      const media = await calcularMediaAvaliacoes(buffetData.id);
      // Atualize o estado com a média calculada
      setMediaAvaliacoes(media);
    };

    // Chame a função para calcular a média quando o componente for montado
    calcularMedia();
  }, [buffetData.id]);

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <Image style={styles.cardImage} source={{ uri: buffetData.imagem }} />
      <Text style={styles.title}>{buffetData.nome}</Text>
      <Text style={styles.subtitle}>Cardápios Disponíveis</Text>
      <CardCardapio />
      <CardCardapio />
      <CardCardapio />
      <Text style={styles.mediaText}>Média de Avaliações: {mediaAvaliacoes.toFixed(2)}</Text>

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
  mediaText: {
    fontSize: 18,
    textAlign: 'left',
    margin: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: 16,
  },
  cardImage: {
    marginTop: 25,
    height: 200,
    width: 370,
    alignSelf: "center",
    borderRadius: 10
  },
});
