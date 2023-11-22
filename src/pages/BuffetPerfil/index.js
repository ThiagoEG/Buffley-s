// BuffetPerfil.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from '../Componentes/Navbar';
import { ref, get as getData, query, orderByChild, equalTo } from 'firebase/database';
import { useUser } from '../../services/UserContext/index';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import CardCardapio from '../componentes2/CardCardapio'; // Importe o componente CardCardapio

const BuffetPerfil = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { buffetData } = route.params;
  const { userId } = useUser();
  const buffetName = buffetData.BuffetNome
  const [cardapiosFavoritos, setCardapiosFavoritos] = useState([]);

  const getBuffetIdByName = async (buffetNome) => {
    try {
      const buffetRef = ref(db, 'buffets');
      const buffetQuery = query(buffetRef, orderByChild('nome'), equalTo(buffetNome));
      const buffetSnapshot = await getData(buffetQuery);
  
      if (buffetSnapshot.exists()) {
        // Obtenha o ID do buffet correspondente ao nome
        const buffetId = Object.keys(buffetSnapshot.val())[0];
        return buffetId;
      } else {
        console.error('Buffet não encontrado no banco de dados.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o buffet:', error);
      return null;
    }
  };

  const loadCardapiosFavoritos = async (buffetId) => {
    try {
      const favoritosRef = ref(db, 'Favoritos');
      const favoritosSnapshot = await getData(query(favoritosRef, orderByChild('BuffetID'), equalTo(buffetId)));
  
      if (favoritosSnapshot.exists()) {
        const favoritosData = favoritosSnapshot.val();
        const cardapiosFavoritosBuffet = Object.values(favoritosData);
  
        console.log('Cardápios Favoritos do Buffet:', cardapiosFavoritosBuffet);
  
        setCardapiosFavoritos(cardapiosFavoritosBuffet); 
      } else {
        console.error('Nenhum cardápio favorito encontrado para este buffet.');
        setCardapiosFavoritos([]); 
      }
    } catch (error) {
      console.error('Erro ao carregar cardápios favoritos:', error);
    }
  };
  
  

  const loadFavoritos = async () => {
    if (buffetData.nome) {
      console.log('Nome do buffet:', buffetData.nome);
  
      const buffetId = await getBuffetIdByName(buffetData.nome);
  
      if (buffetId) {
        console.log('ID do buffet encontrado:', buffetId);
        await loadCardapiosFavoritos(buffetId);
      } else {
        console.error('ID do buffet não encontrado.');
      }
    } else {
      console.error('Nome do buffet não definido.');
    }
  };
  
  
  
 
  const handlePress = () => {
    navigation.navigate('Preferencias', { BuffetNome: buffetData.nome });
  };

  useEffect(() => {
    loadFavoritos();
  }, [buffetData.nome]);
  

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <Image style={styles.cardImage} source={{ uri: buffetData.imagem }} />
      <Text style={styles.title}>{buffetData.nome}</Text>
      <Text style={styles.subtitle}>Cardápios Disponíveis</Text>
      <View>
        {cardapiosFavoritos.map((cardapio) => (
          <CardCardapio key={cardapio.CardapioID} cardapioData={cardapio} buffetData={buffetData} />
        ))}
      </View>
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
};

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
  cardImage: {
    marginTop: 25,
    height: 200,
    width: 370,
    alignSelf: "center",
    borderRadius: 10
  },
});

export default BuffetPerfil;
