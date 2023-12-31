import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Card from '../Componentes/card';
import SideMenu from '../Componentes/SideMenu'
import Navbar from '../componentes2/Navbar2';
import CardInfo from "../Componentes/CardClienteInfo";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";
import { useCardapio } from '../../services/CardapioContext/index'; // Importe o contexto
import { ref, get, set, push } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig'; // Importe a instância do banco de dados do seu arquivo de configuração Firebase
import globalData from '../../services/Globals/globalId';

const { width, height } = Dimensions.get('window');



const Categoria = ({ text }) => (
  <View tyle={styles.categoriaBox}>
    <Text tyle={styles.categoriaText}>{text}</Text>
  </View>
);



const RetanguloComTexto = ({ texto }) => {
  return (
    <View style={styles.retangulo}>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
};


const RetanguloComTexto1 = ({ texto }) => {
  return (
    <View style={styles.retangulo1}>
      <Text style={styles.texto}>{texto}</Text>
    </View>
  );
};

export default function Home({ rating, navigation }) {
  const [cardapios] = useCardapio();
  const [cardapio, setCardapio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const route = useRoute();
  const { uid } = route.params || {};
  const { state } = useUser(); // Obtenha o estado do usuário

  useEffect(() => {
    onRefresh();
    let isMounted = true; // Variável de controle para verificar se o componente está montado
  
    const loadData = async () => {
      try {
        if (isMounted) {
          // Somente executa se o componente estiver montado
          await loadCardapios();
        }
      } catch (error) {
        console.error('Error loading cardapios:', error);
      }
    };
  
    // Carrega os cardápios quando o componente é montado
    loadData();
  
    // Atualiza os cardápios a cada 5 minutos (ou ajuste conforme necessário)
    const intervalId = setInterval(loadData, 300000);
  
    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
      isMounted = false; // Atualiza o status quando o componente é desmontado
    };
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    // Adicione aqui a lógica de atualização dos cardápios ou qualquer outra lógica desejada
    await loadCardapios();

    setRefreshing(false);
  };

  const handleCreateNewCardapio = () => {
    navigation.navigate('CriarCardapio');
  };
  console.log('UID do usuário:', uid);
  const username = state.username;

  const [tipoCardapio, setTipoCardapio] = useState('aprovados');
  const handleToggleCardapio = (tipo) => {
    setTipoCardapio(tipo);
  }

  const textos = ['Aprovados', 'Recusados'];

  const textos1 = ['300 pessoas', '2,500', '22/05/23'];

  const card = {
    itens: '15 Itens',
    maisBarato: 'Salada, 100R$',
    maisCaro: 'Prato principal, 700R$',
  };
  function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  const loadCardapios = async () => {
    try {
      const cardapiosRef = ref(db, 'cardapios');
      const cardapiosSnapshot = await get(cardapiosRef);

      if (cardapiosSnapshot.exists()) {
        const cardapiosData = cardapiosSnapshot.val();
        const cardapiosArray = Object.keys(cardapiosData).map((cardapioId) => ({
          id: cardapioId,
          ...cardapiosData[cardapioId],
        }));

        // Filtrar os cardápios com base no UID do usuário atual
        const cardapiosDoUsuario = cardapiosArray.filter((cardapio) => cardapio.userCardapioId === state.uid);

        setCardapio(cardapiosDoUsuario);
      } else {
        console.error('No cardápio found in the database.');
        setCardapio([]);
      }
    } catch (error) {
      console.error('Error loading cardapios:', error);
    }
  };


  useEffect(() => {
    loadCardapios();
  }, []);


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <View key={i} style={styles.starContainer}>
          <MaterialIcons
            name={i <= rating ? 'star_border' : 'grade'}
            size={30}
            color={i <= rating ? 'gold' : 'gray'}
          />
        </View>
      );
    }
    return stars;
  };
  const handleNotifications = () => {
    navigation.navigate('TelaNotificacoes');
  };
  const handleCardapioNavigation = () => {
    navigation.navigate('CriarCardapio');
  };
  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil');
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  if (!cardapios || cardapios.length === 0) {
    return (

      <View style={styles.container}
      >
        <Navbar navigation={navigation} onMenuPress={toggleMenu}></Navbar>
        <SideMenu isVisible={menuVisible} onClose={toggleMenu} />

        <SideMenu isVisible={menuVisible} onClose={toggleMenu}></SideMenu>

        <ScrollView contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

          }
        >

          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent2}>
          </ScrollView>

          <Text style={styles.title}>Cardápios Retornados </Text>
          {cardapio.length > 0 ? (
            cardapio.map((cardapioItem, index,) => (
              <CardInfo key={index} cardapioId={cardapioItem.id} />
            ))
          ) : (
            
              <View style={styles.cardAdd}>
                <Text style={styles.cardTitle}>Sem Cardapio Retornados!</Text>
              </View>
          )}


        </ScrollView>

      </View>

    );
  }

  return (

    <View style={styles.container}>
      <Navbar navigation={navigation} onMenuPress={toggleMenu}></Navbar>
      <SideMenu isVisible={menuVisible} onClose={toggleMenu} />

      <SideMenu isVisible={menuVisible} onClose={toggleMenu}></SideMenu>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <ScrollView horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent2}>


        </ScrollView>

        <View style={styles.containerCard}>


        <View style={{ flex: 1 }}>
            {/* Map through cardapios and render only if userID matches userCardapioId */}
            {cardapios.map((cardapioItem, index) => {
              if (cardapioItem.userID === state.uid) {
                return <Card key={index} cardapio={cardapioItem} />;
              }
              return null;
            })}
          </View>

          <TouchableOpacity style={styles.bottom}>
            <Text style={styles.bottomText}>Visualizar</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </View>

  );
};

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
    elevation: 8,
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,  // Porcentagem em relação à altura
    marginHorizontal: width * 0.05,  // Porcentagem em relação à largura
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
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
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 32,
    marginVertical: 32,
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
    paddingHorizontal: 4,
  },



  retanguloComEspacamento: {
    marginRight: -16
  },

  retangulo: {
    height: 42,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 8,
  },
  retangulo1:
  {
    height: 32,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 24,
    marginRight: 38,
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
  cardTitle: {
    fontSize: 26,
    fontWeight: "normal",
    marginRight: 8,
  }
});

