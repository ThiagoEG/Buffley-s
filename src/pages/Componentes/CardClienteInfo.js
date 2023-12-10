import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearButton from './LinearButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, get, set } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import { useCardapio } from '../../services/CardapioContext'; // Importe o contexto
import { useUser } from '../../services/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';



const CardInfo = ({ cardapioId }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { state } = useUser();
  const { setCardapio } = useCardapio();
  const [favoritado, setFavoritado] = useState(false);

  const userId = state.uid;

  const [novoCardapio, setNovoCardapio] = useState(null);

  const loadCardapio = async () => {
    const cardapioRef = ref(db, `cardapios/${cardapioId}`);
    try {
      const snapshot = await get(cardapioRef);
      if (snapshot.exists()) {
        const cardapioData = snapshot.val();
        setNovoCardapio(cardapioData);

        // Verificar se o cardápio está favoritado
        const favoritoRef = ref(db, `Favoritos/${userId}_${cardapioId}`);
        const favoritoSnapshot = await get(favoritoRef);
        if (favoritoSnapshot.exists()) {
          setFavoritado(true);
          setPhoneIconColor('green');
          setPhoneIcon('star');
        }
      } else {
        console.error('Cardápio não encontrado no banco de dados.');
      }
    } catch (error) {
      console.error('Erro ao obter dados do cardápio:', error);
    }
  };

  useEffect(() => {
    loadCardapio();
  }, [cardapioId]);

  const handleVerCardapio = () => {
      navigation.navigate('DetalhesCardapioDBC', {cardapioId})
      console.log("cardapio id", {cardapioId})
  };

  return (
    <View style={styles.cardInfoContainer}>
      {novoCardapio ? (
        <>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingRight: 8, }}>
            <Text style={styles.cardName}>{novoCardapio.nomeCardapio}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 'auto' }}>
            <View style={styles.retangulo}>
              <Text style={styles.textRec}>{novoCardapio.numeroConvidados} pessoas</Text>
            </View>
            <View style={styles.retangulo}>
              <Text style={styles.textRec}>R$ {novoCardapio.totalCost.toFixed(2)}</Text>
            </View>
            <View style={styles.retangulo}>
              <Text style={styles.textRec}>{novoCardapio.data}</Text>
            </View>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.infoText}>Quantidade de itens: {novoCardapio.quantidadeItens}</Text>
            <Text style={styles.infoText}>Custo mais barato: {novoCardapio.categoriaMaisBarata}</Text>
            <Text style={styles.infoText}>Custo mais caro: {novoCardapio.categoriaMaisCara}</Text>
          </View>
          
          <LinearButton title="Ver" onPress={handleVerCardapio} />
        </>
      ) : (
        <Text>Carregando o cardápio...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardInfoContainer: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 2,
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 22,
  },
  cardName: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 4,
  },
  retangulo: {
    width: 100,
    height: 35,
    marginTop: 12,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  containerInfo: {
    width: 'auto',
    height: 'auto',
    marginTop: 12,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default CardInfo;
