import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ itens, maisBarato, maisCaro }) => {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.label}>Itens:</Text>
        <Text style={styles.text}>{itens}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Mais Barato:</Text>
        <Text style={styles.text}>{maisBarato}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Mais Caro:</Text>
        <Text style={styles.text}>{maisCaro}</Text>
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
    shadowColor: 'black', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra (horizontal, vertical)
    shadowOpacity: 0.8, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 10, // Elevação da sombra (para Android)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    marginLeft: 8,
    color:'#be3455'
  },
});

export default Card;
