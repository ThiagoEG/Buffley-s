import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CardCardapio = ({ cardapioData, buffetData }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
const [selectedCardapio, setSelectedCardapio] = useState(null);
console.log("data", buffetData)
const handlePress = () => {
  navigation.navigate('Preferencias', { BuffetNome: buffetData.nome, cardapioData: cardapiosFavoritos });
};
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
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* Aqui você pode exibir as informações do cardápio selecionado */}
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
                navigation.navigate('Preferencias', { BuffetNome: buffetData.nome, cardapioData: cardapioData });
              }}
            >
              <Text style={styles.buttonText}>Ir para Preferências</Text>
            </TouchableOpacity>
            <TouchableHighlight
              style={{ ...styles.closeButton, backgroundColor: '#be3455' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Fechar Modal</Text>
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
