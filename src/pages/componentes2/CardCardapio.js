import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 16,
  },
  textContainer: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default CardCardapio;