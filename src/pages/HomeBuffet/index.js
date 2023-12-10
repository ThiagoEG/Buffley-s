

import React, { useEffect, useState, useLayoutEffect  } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions, StatusBar, RefreshControl } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import PreferenciasCard from '../Componentes/PreferenciasCard';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../../services/UserContext/index';
import SideMenu from '../Componentes/SideMenu';
import CardInfo from "../Componentes/CardBuffetInfo";
import Navbar from '../componentes2/Navbar2';


const { width, height } = Dimensions.get('window');

export default function HomeBuffet({ navigation }) {
  const route = useRoute();
  const { uid } = route.params || {};
  const [menuVisible, setMenuVisible] = useState(false);
  const [preferenciasData, setPreferenciasData] = useState([]);
  const [hasPreferencias, setHasPreferencias] = useState(true); // Adicione um estado para verificar se há preferências ou não
  const { state } = useUser();
  const userId = state.uid;
  const [refreshing, setRefreshing] = React.useState(false);
  const [isScreenInitialized, setIsScreenInitialized] = useState(false);
  const [favoritos, setFavoritos] = useState([]);


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const onRefresh = async () => {
    setRefreshing(true);
  
    try {
      await fetchData();
      await fetchDataFavoritos();
    } catch (error) {
      console.error('Error during refresh:', error);
    }
  
    setRefreshing(false);
  };
  

  const fetchData = async () => {
    try {
      const preferenciasRef = ref(db, 'preferencias');
      const preferenciasSnapshot = await get(preferenciasRef);

      if (preferenciasSnapshot.exists()) {
        const preferenciasData = preferenciasSnapshot.val();

        if (preferenciasData) {
          const preferenciasArray = Object.keys(preferenciasData).map((preferenciaId) => ({
            id: preferenciaId,
            ...preferenciasData[preferenciaId],
          }));

          setPreferenciasData(preferenciasArray);
          setHasPreferencias(true);
        } else {
          console.error('Preferencias data is empty.');
          setPreferenciasData([]);
          setHasPreferencias(false);
        }
      } else {
        console.error('No preferencias found in the database.');
        setPreferenciasData([]);
        setHasPreferencias(false);
      }
    } catch (error) {
      console.error('Error fetching preferencias:', error);
    }

  };

  const fetchDataFavoritos = async () => {
    try {
      const favoritosRef = ref(db, 'Favoritos');
      const favoritosSnapshot = await get(favoritosRef);
  
      if (favoritosSnapshot.exists()) {
        const favoritosData = favoritosSnapshot.val();
  
        if (favoritosData) {
          const favoritosArray = Object.keys(favoritosData).map((favoritoId) => ({
            id: favoritoId,
            ...favoritosData[favoritoId],
          }));
  
          setFavoritos(favoritosArray);
        }
      }
    } catch (error) {
      console.error('Error fetching favoritos data:', error);
    }
  };

  
  useEffect(() => {
    if (!isScreenInitialized) {
      fetchData();
      fetchDataFavoritos();
      setIsScreenInitialized(true);
    }
  }, [isScreenInitialized]);
  useLayoutEffect(() => {
    if (!isScreenInitialized) {
      fetchData();
      setIsScreenInitialized(true);
    }
  }, [isScreenInitialized]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Navbar navigation={navigation} onMenuPress={toggleMenu}></Navbar>
      <SideMenu isVisible={menuVisible} onClose={toggleMenu} />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.title}>Cardápio Solicitados</Text>

        {hasPreferencias ? (
          preferenciasData.map((preferencia) => {
            if (preferencia.buffetId === userId) {
              return (
                <PreferenciasCard
                  key={preferencia.id}
                  nome={preferencia.nome}
                  qtdsPessoas={preferencia.qtdPessoas}
                  data={preferencia.data}
                  preferenciasId={preferencia.id}
                  preferenciasCliente={preferencia.preferenciasCliente}
                  clienteImagemUrl={preferencia.clienteImagemUrl}
                />
              );
            }
          })
        ) : (
          <View style={styles.cardAdd}>
            <Feather name="alert-triangle" size={50} color="red" />
            <Text style={styles.noPreferenciasText}>Você não possui solicitações de cardápio.</Text>
          </View>
        )}

<Text style={styles.title}>Seus cardápios Favoritos</Text>
{favoritos.length > 0 ? (
  favoritos.map((favorito) => {
    return (
      <CardInfo
        key={favorito.id}
        cardapioId={favorito.CardapioID}
      />
    );
  })
) : (
  <View style={styles.cardAdd}>
    <Feather name="alert-triangle" size={50} color="red" />
    <Text style={styles.noPreferenciasText}>Você não possui cardápios favoritos.</Text>
  </View>
)}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,  // Use width e height para tornar o tamanho responsivo
    height: height,
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: height * 0.09,  // Defina uma porcentagem adequada
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 5,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    marginTop: 32,
    marginLeft: 32,
    fontWeight: 'bold',
  },

  containerCard: {
    width: 360,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 32,
    marginVertical: 32,
    alignSelf: 'center'
  },
  image: {
    width: 330,
    height: 160,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  titleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },

  titleText: {
    fontSize: 32,
    fontWeight: 'bold'
  },

  categorias: {
    flexDirection: 'row',
    margin: 10,
  },

  containerSquare: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 10,
  },
  square: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  squareTextOnly: {
    height: 30,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 12,
  },

  bottom: {
    width: 330,
    height: 42,
    backgroundColor: '#be3455',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  bottomText: {
    color: 'white',
    fontWeight: 'bold',
  },

  scrollContent: {
    paddingBottom: 92, // Altura da navbar
  },

  rectangle: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginTop: 10,

  },
  starContainer: {
    marginRight: 5,
  },

  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },

  retanguloComEspacamento: {
    marginLeft: '-5%'
  },

  retangulo: {
    height: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 8,
  },
  texto: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  scrollContent2: {
    paddingBottom: 5, // Altura da navbar
  },

  retangulo1: {
    width: '85%',
    height: 75,
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 36,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,

    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 12,
  },

  titleSol: {
    alignContent: 'center',
    flexDirection: 'row',
  },

  titleSol2: {
    alignContent: 'center',
    marginLeft: 10,
  },

  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '10%'
  },

  title2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#F27288',
  },

  imagemIcon: {
    resizeMode: "contain",
    marginRight: 16,

  },

  imagem:
  {
    margin: '5%'
  },

  noPreferenciasContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  noPreferenciasText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 16,
    color: 'gray',
  },
  cardAdd: {
    marginTop: 16,
    marginHorizontal: 16,
    height: 150,
    backgroundColor: 'white',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 8,
  },
});