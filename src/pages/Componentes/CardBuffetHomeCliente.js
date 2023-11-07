import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar

const CardComponent = ({ buffetData }) => {
  const { nome, avaliacao, localizacao, imagemUrl } = buffetData;

  // Função para renderizar as estrelas com base na avaliação
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= avaliacao ? 'star' : 'star-o'}
          size={20}
          color={i <= avaliacao ? 'gold' : 'gray'}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
        <View style={styles.imageContainer}>
        <Image style={styles.cardImage} source={{ uri: imagemUrl }} />
        </View>
     
      <View style={styles.infoContainer}>
        <View style={styles.starsContainer}>{renderStars()}</View>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={20} color="gray" />
          <Text style={styles.locationText}>{localizacao}</Text>
        </View>
        <Text style={styles.buffetName}>{nome}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: '80%',
    alignSelf: 'center'
  },
  imageContainer:
  {

  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    marginLeft: 5,
    color: 'gray',
  },
  buffetName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CardComponent;
