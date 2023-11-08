import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../services/firebaseConfigurations/firebaseConfig'; // Importe sua configuração do Firebase Firestore
import { ref, set, child  } from 'firebase/database'; // Importe as funções apropriadas do Firebase Realtime Database

const getBuffetIds = async () => {
  const buffetsRef = ref(db, 'buffets');
  const snapshot = await get(child(buffetsRef));
  
  if (snapshot.exists()) {
    // O snapshot contém os IDs dos buffets
    const buffetIds = Object.keys(snapshot.val());
    return buffetIds;
  } else {
    // Não foram encontrados buffets
    return [];
  }
};



const CardComponent = ({ buffetData }) => {
  const { nome, endereco, imagem } = buffetData;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0); // Estado para armazenar a avaliação
  const [buffetId, setBuffetId] = useState(null);
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

  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil', { buffetData });
  };
  const handleAvaliacao = (novaAvaliacao, buffetId) => {
    // Atualize o estado local com a nova avaliação
    setAvaliacao(novaAvaliacao);
  
    // Atualize a avaliação no Firebase Realtime Database usando o ID do buffet
    const databaseRef = ref(db, `buffets/${buffetId}/avaliacao`);
    set(databaseRef, novaAvaliacao)
      .then(() => {
        console.log('Avaliação atualizada com sucesso');
      })
      .catch((error) => {
        console.error('Erro ao atualizar a avaliação:', error);
      });
  };
  useEffect(() => {
    // Ao montar o componente, obtenha o ID do buffet e defina-o no estado
    getBuffetIds().then((buffetIds) => {
      if (buffetIds.length > 0) {
        // Suponha que você queira pegar o primeiro ID da lista
        const firstBuffetId = buffetIds[0];
        setBuffetId(firstBuffetId);
      }
    });
  }, []);

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: imagem }} />

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.buffetName}>{nome}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FontAwesome name="map-marker" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.locationText}>{endereco}</Text>
        <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleAvaliacao(star)}
          >
            <FontAwesome
              name={star <= avaliacao ? 'star' : 'star-o'}
              size={20}
              color={star <= avaliacao ? 'gold' : 'gray'}
            />
          </TouchableOpacity>
        ))}
      </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Endereço</Text>
            <Text>{endereco}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.profileButton} onPress={handleBuffetNavigation}>
        <Text style={styles.profileButtonText}>Ver Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    alignSelf: 'center',
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  locationText: {
    marginTop: 5,
    color: 'gray',
  },
  buffetName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: '#be3455',
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  profileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#be3455',
    borderRadius: 5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CardComponent;
