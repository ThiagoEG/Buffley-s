import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ref, set, push, query, orderByChild, equalTo, get, update, onValue } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import { useUser } from '../../services/UserContext/index'; // Importe seu contexto de usuário


const calcularMediaAvaliacoes = (avaliacoes) => {
  if (avaliacoes.length === 0) return 0;

  const somaAvaliacoes = avaliacoes.reduce((total, avaliacao) => total + avaliacao.avaliacao, 0);
  const media = somaAvaliacoes / avaliacoes.length;

  return media;
};
const CardComponent = ({ buffetData  }) => {
  const { nome, endereco, imagem } = buffetData;
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState(0); // Certifique-se de que esta linha está correta
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [avaliacao, setAvaliacao] = useState(0); // Estado para armazenar a avaliação
  const [fetchComplete, setFetchComplete] = useState(false);
  const { state } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  const userID = state.uid;

  const checkIsFavorite = async () => {
    try {
      const buffetId = await getBuffetId(buffetData.nome);
  
      if (buffetId) {
        const favoritesRef = ref(db, 'favorites');
        const favoritesQuery = query(
          favoritesRef,
          orderByChild('userIdBuffetId'),
          equalTo(`${userID}_${buffetId}`)
        );
        const favoritesSnapshot = await get(favoritesQuery);
  
        setIsFavorite(favoritesSnapshot.exists());
      } else {
        console.error('ID do buffet não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao verificar se o buffet está nos favoritos:', error);
    }
  };
  

  const handleToggleFavorite = async () => {
    try {
      const buffetId = await getBuffetId(buffetData.nome);
  
      if (buffetId) {
        const favoritesRef = ref(db, 'favorites');
        const userIdBuffetId = `${userID}_${buffetId}`;
        const favoriteQuery = query(
          favoritesRef,
          orderByChild('userIdBuffetId'),
          equalTo(userIdBuffetId)
        );
        const favoriteSnapshot = await get(favoriteQuery);
  
        if (favoriteSnapshot.exists()) {
          // Se já estiver nos favoritos, remova
          const favoriteKey = Object.keys(favoriteSnapshot.val())[0];
          const favoriteRef = ref(db, `favorites/${favoriteKey}`);
          await set(favoriteRef, null);
        } else {
          // Se não estiver nos favoritos, adicione
          const newFavoriteRef = push(favoritesRef);
          const newFavoriteData = {
            userIdBuffetId,
            userId: userID,
            buffetId: buffetId,
          };
          await set(newFavoriteRef, newFavoriteData);
        }
  
        // Atualize o estado de favoritos
        setIsFavorite(!isFavorite);
      } else {
        console.error('ID do buffet não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao adicionar/remover buffet dos favoritos:', error);
    }
  };
  
  


  useEffect(() => {
    // Busque a avaliação do usuário para este buffet e atualize o estado local se existir
    async function fetchUserAvaliacao() {
      const buffetId = await getBuffetId(nome);
      if (buffetId) {
        const existingAvaliacaoKey = await checkUserAvaliacao(buffetId);
        if (existingAvaliacaoKey) {
          const avaliacaoRef = ref(db, `avaliacoes/${existingAvaliacaoKey}`);
          const avaliacaoSnapshot = await get(avaliacaoRef);
          if (avaliacaoSnapshot.exists()) {
            const userAvaliacao = avaliacaoSnapshot.val();
            setAvaliacao(userAvaliacao.avaliacao);
          }
        }
      }
    }
    fetchUserAvaliacao();


    // Busque todas as avaliações do buffet e calcule a média
    async function fetchMediaAvaliacoes() {
      const buffetId = await getBuffetId(nome);
      if (buffetId) {
        const avaliacaoRef = ref(db, 'avaliacoes');
        const buffetAvaliacoesQuery = query(
          avaliacaoRef,
          orderByChild('buffetId'),
          equalTo(buffetId)
        );
    
        onValue(buffetAvaliacoesQuery, (snapshot) => {
          if (snapshot.exists()) {
            const avaliacoes = Object.values(snapshot.val());
            const media = calcularMediaAvaliacoes(avaliacoes);
            setMediaAvaliacoes(media);
          } else {
            setMediaAvaliacoes(0);
          }
        });
      }
    }
    fetchMediaAvaliacoes();
    checkIsFavorite();
  }, []); // Busque a avaliação do usuário e a média das avaliações ao montar o componente

  useEffect(() => {
    async function fetchMediaAvaliacoes() {
      // ... (código existente omitido para brevidade)

      onValue(buffetAvaliacoesQuery, (snapshot) => {
        if (snapshot.exists()) {
          const avaliacoes = Object.values(snapshot.val());
          const media = calcularMediaAvaliacoes(avaliacoes);
          setMediaAvaliacoes(media);
        } else {
          setMediaAvaliacoes(0);
        }

        setFetchComplete(true);  // Indica que a busca da média foi concluída
      });
    }

    setFetchComplete(false);  // Reseta o estado para indicar que a busca está em andamento
    fetchMediaAvaliacoes();
  }, [buffetData.nome]);
  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil', { buffetData, mediaAvaliacoes });
  };

  const getBuffetId = async (buffetNome) => {
    try {
      const buffetRef = ref(db, 'buffets');
      const buffetQuery = query(buffetRef, orderByChild('nome'), equalTo(buffetNome));
      const buffetSnapshot = await get(buffetQuery);

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

  const checkUserAvaliacao = async (buffetId) => {
    try {
      const avaliacaoRef = ref(db, 'avaliacoes');
      const userAvaliacaoQuery = query(
        avaliacaoRef,
        orderByChild('userId'),
        equalTo(userID)
      );
      const userAvaliacoesSnapshot = await get(userAvaliacaoQuery);

      if (userAvaliacoesSnapshot.exists()) {
        // Verifique se o usuário já avaliou o buffet
        const userAvaliacoes = userAvaliacoesSnapshot.val();
        const existingAvaliacaoKey = Object.keys(userAvaliacoes).find(
          (key) => userAvaliacoes[key].buffetId === buffetId
        );

        return existingAvaliacaoKey;
      }

      return null;
    } catch (error) {
      console.error('Erro ao verificar a avaliação do usuário:', error);
      return null;
    }
  };

  const handleAvaliacao = async (novaAvaliacao) => {
    if (!userID || !userID) {
      console.error('ID do usuário não encontrado. Não é possível adicionar a avaliação.');
      return;
    }
  
    const buffetId = await getBuffetId(nome);
  
    if (!buffetId) {
      console.error('Não foi possível obter o ID do buffet.');
      return;
    }
  
    // Verifique se o usuário já avaliou o buffet
    const existingAvaliacaoKey = await checkUserAvaliacao(buffetId);
  
    if (existingAvaliacaoKey) {
      // Se o usuário já avaliou o buffet, atualize a avaliação existente
      const avaliacaoRef = ref(db, `avaliacoes/${existingAvaliacaoKey}`);
      const avaliacaoData = {
        userId: userID,
        buffetId: buffetId,
        avaliacao: novaAvaliacao,
      };
  
      try {
        await update(avaliacaoRef, avaliacaoData);
        console.log('Avaliação atualizada com sucesso');
  
        // Atualize a média de avaliações no banco de dados
        updateMediaAvaliacoes(buffetId);
      } catch (error) {
        console.error('Erro ao atualizar a avaliação:', error);
      }
    } else {
      // Se o usuário ainda não avaliou o buffet, crie uma nova avaliação
      const avaliacaoRef = ref(db, 'avaliacoes');
      const novaAvaliacaoRef = push(avaliacaoRef);
  
      const avaliacaoData = {
        userId: userID,
        buffetId: buffetId,
        avaliacao: novaAvaliacao,
      };
  
      try {
        await set(novaAvaliacaoRef, avaliacaoData);
        console.log('Avaliação adicionada com sucesso');
  
        // Atualize a média de avaliações no banco de dados
        updateMediaAvaliacoes(buffetId);

        
      } catch (error) {
        console.error('Erro ao adicionar a avaliação:', error);
      }
    }
  
    // Atualize o estado local com a nova avaliação
    setAvaliacao(novaAvaliacao);
    resetAvaliacao();
  };
  
  const updateMediaAvaliacoes = async (buffetId) => {
    try {
      const avaliacaoRef = ref(db, 'avaliacoes');
      const buffetAvaliacoesQuery = query(
        avaliacaoRef,
        orderByChild('buffetId'),
        equalTo(buffetId)
      );
  
      const snapshot = await get(buffetAvaliacoesQuery);
  
      if (snapshot.exists()) {
        const avaliacoes = Object.values(snapshot.val());
        const media = calcularMediaAvaliacoes(avaliacoes);
  
        // Atualize a média de avaliações no nó do buffet
        const buffetRef = ref(db, `buffets/${buffetId}`);
        await update(buffetRef, { mediaAvaliacoes: media });
  
        console.log('Média de avaliações atualizada com sucesso no banco de dados');
      } else {
        console.log('Sem avaliações para calcular a média.');
      }
    } catch (error) {
      console.error('Erro ao calcular e atualizar a média de avaliações:', error);
    }
  };
  

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleAvaliacao(i)}
          activeOpacity={0.7}
        >
          <FontAwesome
            name={i <= mediaAvaliacoes ? 'star' : 'star-o'}
            size={20}
            color={i <= mediaAvaliacoes ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: imagem }} />
  
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.buffetName}>{nome}</Text>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.icon}>
              <FontAwesome name="map-marker" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleFavorite} style={styles.icon}>
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color={isFavorite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.locationText}>{endereco}</Text>
        <Text style={styles.mediaText}>Média: {mediaAvaliacoes.toFixed(2)}</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
    marginVertical: 16,
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
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  locationText: {
    color: 'gray',
  },
  buffetName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mediaText: {
    marginBottom: 5,
    color:'gray'
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starIcon: {
    marginRight: 5,
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
  