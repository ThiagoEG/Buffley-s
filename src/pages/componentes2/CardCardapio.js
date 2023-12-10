import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, push, set, get,} from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useUser } from '../../services/UserContext/index';

const CardCardapio = ({ cardapioData, buffetData }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCardapio, setSelectedCardapio] = useState(null);
  const { state } = useUser();
 const userId = state.uid;
  console.log("data", buffetData)

  const handlePress = () => {
    navigation.navigate('DetalhesCardapioDBC', { BuffetNome: buffetData.nome, cardapioData: cardapiosFavoritos, cardapioId: cardapioData.CardapioID });
  };

  const handleAddCardapio = async () => {
    if (selectedCardapio) {
      const cardapioId = selectedCardapio.CardapioID;
      
      // Define the path to the location where the cardapio data is stored
      const cardapioRef = ref(db, `cardapios/${cardapioId}`);

      try {
        // Fetch cardapio data from Firebase
        const snapshot = await get(cardapioRef);
        const cardapioDetails = snapshot.val();

        // Check if the user already has this cardapio
        const userCardapioRef = ref(db, `cardapios`);
        const userCardapioSnapshot = await get(userCardapioRef);
        const userCardapios = userCardapioSnapshot.val();

        const userAlreadyHasCardapio = Object.values(userCardapios || {}).find(
          (userCardapio) => userCardapio.userId === userId && userCardapio.cardapioData.CardapioID === cardapioId
        );

        if (userAlreadyHasCardapio) {
          Alert.alert('Error', 'Você já possui esse cardápio.');
        } else {
          // Create a new object with user ID and fetched cardapio data
          const newCardapio = {
            userCardapioId: userId,
            ...selectedCardapio,
            ...cardapioDetails,
          };

          // Define the path to the location where you want to save the new cardapio
          const newCardapioRef = ref(db, `cardapios`);

          // Push the new cardapio to the database
          push(newCardapioRef, newCardapio)
            .then(() => {
              console.log('New Cardapio saved to the database!');
              Alert.alert('Sucesso', 'O cardápio será mostardo na tela dos crdápios!');
              setModalVisible(!modalVisible);
              navigation.goBack(); // Go back to the previous screen
            })
            .catch((error) => {
              console.error('Error saving new Cardapio: ', error)
            });
        }
      } catch (error) {
        console.error('Error fetching cardapio details: ', error);
      }
    }
  };
  

  const CardapioID = buffetData.CardapioID;
  console.log("id cardapio", CardapioID)
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/Buffley.png')} // Substitua pelo caminho da sua imagem
          style={styles.cardImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>Nome: {cardapioData.Nome}</Text>
        <Text style={styles.label2}>Quantidade de Pessoas: {cardapioData.QuantidadePessoas}</Text>
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          setSelectedCardapio(cardapioData);
          setModalVisible(true);
        }}
      >
        <Image source={require('../../../assets/MenuDots.png')} style={styles.iconImage} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCardapio && (
              <View>
                <Text style={styles.label}>Nome: {selectedCardapio.Nome}</Text>
                <Text style={styles.label}>Quantidade de Pessoas: {selectedCardapio.QuantidadePessoas}</Text>
                {/* Adicione mais informações conforme necessário */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('DetalhesCardapioDBC', { BuffetNome: buffetData.nome, cardapioData: cardapioData, cardapioId: cardapioData.CardapioID });
                    }}
                  >
                    <Text style={styles.buttonText}>Ver Cardápio</Text>
                  </TouchableOpacity>
                  <TouchableHighlight
                    style={{ ...styles.closeButton, backgroundColor: '#be3455' }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      handleAddCardapio();
                    }}
                  >
                    <Text style={styles.textStyle}>Solicitar Cardápio</Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

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
    justifyContent: 'space-between', // Para alinhar o ícone no canto superior direito
    alignItems: 'center', // Para centralizar verticalmente o conteúdo
  },
  imageContainer: {
    marginRight: 16,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  label2: {
    fontSize: 14,
    color: '#333',
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10
  },
  closeButton: {
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
    marginLeft: '5%'
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#be3455',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Layout de linha para posicionar os botões lado a lado
    justifyContent: 'space-between', // Espaçamento igual entre os botões

    marginTop: 10,
  },
});

export default CardCardapio;
