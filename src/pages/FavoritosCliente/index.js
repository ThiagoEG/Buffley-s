import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, set, push, query, orderByChild, equalTo, get, update, onValue } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import CardComponent from '../Componentes/CardBuffetHomeCliente'; // Substitua pelo caminho real do seu componente CardComponent
import Navbar from '../componentes2/Navbar2';
import SideMenu from '../Componentes/SideMenu';
import { useUser } from '../../services/UserContext/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSideMenu } from '../../services/sideMenuContext';
import { ScrollView } from 'react-native-gesture-handler';
const FavoritosScreen = ({navigation}) => {
  const { state } = useUser();
  const [menuVisible, setMenuVisible] = useState(false);
  const userID = state.uid;
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritesRef = ref(db, 'favorites');
        const userFavoritesQuery = query(
          favoritesRef,
          orderByChild('userId'),
          equalTo(userID)
        );
        const userFavoritesSnapshot = await get(userFavoritesQuery);
  
        if (userFavoritesSnapshot.exists()) {
          const userFavorites = [];
          userFavoritesSnapshot.forEach((childSnapshot) => {
            const favorite = childSnapshot.val();
            userFavorites.push(favorite.buffetId);
          });
  
          setFavoritos(userFavorites);
        } else {
          setFavoritos([]);
        }
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    };
  
    fetchFavoritos();
  }, [userID]);
  

  // Adaptação para buscar informações sobre buffets favoritos do usuário
  const [buffetData, setBuffetData] = useState([]);

  useEffect(() => {
    const buffetRef = ref(db, 'buffets');
    
    onValue(buffetRef, (snapshot) => {
      const buffetList = [];
      snapshot.forEach((childSnapshot) => {
        const buffet = childSnapshot.val();
        const buffetId = childSnapshot.key; // Obter o ID do buffet
  
        // Verificar se o buffetId está nos favoritos
        if (favoritos.includes(buffetId)) {
          buffetList.push(buffet);
        }
      });
  
      setBuffetData(buffetList);
    });
  }, [favoritos]);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  return (
    <ScrollView style={styles.container}>
      <Navbar navigation={navigation} onMenuPress={toggleMenu} />
      <SideMenu isVisible={menuVisible} onClose={toggleMenu} />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>Meus Favoritos</Text>
        {buffetData.length > 0 ? (
          <FlatList style={styles.containerCard}
          
            data={buffetData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardComponent buffetData={item} />
            )}
          />
        ) : (
          <Text style={styles.noFavoritesText}>Você ainda não tem buffets favoritos.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  containerInfo: {
    width: '100%',
    alignItems: 'center',
  },
  containerCard: {
    width: '100%',
  },
  noFavoritesText: {
    fontSize: 16,
    color: 'gray', // ou qualquer cor desejada
    marginTop: 20,
  },
});

export default FavoritosScreen;