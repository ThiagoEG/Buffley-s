import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer

const Card = ({ itens, maisBarato, maisCaro }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/Rectangle-152.png')} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.label2}>Fixo ou Freelancer</Text>
        <Text style={styles.label2}>Salario</Text>
        <Text style={styles.label2}>Cargo</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="phone" size={24} color="gray" />
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
    flex: 1, // Allow text to expand and fill available space
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;
