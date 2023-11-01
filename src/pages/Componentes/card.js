import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ cardapio }) => {
  // Use o operador condicional (ternário) para fornecer um valor padrão
  const nomeCardapio = cardapio.nomeCardapio || 'Nome do Cardápio Padrão';
  const custoMaisBarato = cardapio.custoMaisBarato || 'Custo Mais Barato Padrão';
  const custoMaisCaro = cardapio.custoMaisCaro || 'Custo Mais Caro Padrão';

  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.text}>{nomeCardapio}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Mais Barato:</Text>
        <Text style={styles.text}>{custoMaisBarato}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Mais Caro:</Text>
        <Text style={styles.text}>{custoMaisCaro}</Text>
      </View>
      {/* Adicione o restante das informações do cardápio, se necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    alignSelf: 'center',
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
    color: '#be3455',
  },
});

export default Card;
