import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CardCardapio = ({ itens, maisBarato, maisCaro }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={require("../../../assets/Rectangle-152.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Cardápio</Text>
        <Text style={styles.label2}>Pessoas: 150</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={require('../../../assets/MenuDots.png')} style={styles.imagemIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    margin: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 22,
  },
  textContainer: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
  },
  label2: {
    color: '#be3455',
    fontSize: 16,
  },
  iconContainer: {
    marginLeft: 'auto', // Isso empurra o ícone para a direita
  },
  imagemIcon: {
    resizeMode: 'contain',
    width: 30, // Ajuste o tamanho conforme necessário
    height: 30, // Ajuste o tamanho conforme necessário
  },
});

export default CardCardapio;