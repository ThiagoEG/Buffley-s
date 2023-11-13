import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import SideMenu from '../Componentes/SideMenu';
import { useUser } from '../../services/UserContext/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import Navbar from '../componentes2/Navbar2';
import BuffetPerfil from '../BuffetPerfil';
import CardBuffet from '../Componentes/CardBuffetHomeCliente';

const { width, height } = Dimensions.get('window');

export default function Home({ rating, navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Novo estado para forçar a re-renderização
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const route = useRoute();
  const { uid } = route.params || {};
  const { state } = useUser();
  const [buffetData, setBuffetData] = useState([]);
  const [avaliacao, setAvaliacao] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa

  const handleSearch = () => {
    // Atualize o estado de pesquisa e force a re-renderização
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const resetAvaliacao = () => {
    setAvaliacao(0);}
  useEffect(() => {
    const buffetRef = ref(db, 'buffets');

    onValue(buffetRef, (snapshot) => {
      const buffetList = [];
      snapshot.forEach((childSnapshot) => {
        const buffet = childSnapshot.val();
        buffetList.push(buffet);
      });

      setBuffetData(buffetList);
    });

  }, []);

  console.log('UID do usuário:', uid);
  const username = state.username;

  const textos = ['4 e 5 Estrelas', '3 Estrelas', '2 Estrelas', '1 Estrela', 'todos'];

  const filterBuffets = (buffetList, selectedRating) => {
    if (!selectedRating) {
      return buffetList;
    }
  
    const lowerLimit = parseInt(selectedRating); // ParseInt para garantir que seja um número inteiro
    const upperLimit = lowerLimit + 1;
  
    const filteredBuffets = buffetList.filter(buffet => {
      const mediaAvaliacoes = parseFloat(buffet.mediaAvaliacoes);
      
      // Mostrar todos os buffets se o filtro for "Todos os Buffets"
      if (selectedRating === 'todos') {
        return true;
      }
  
      // Mostrar buffets não avaliados no filtro de uma estrela
      if (selectedRating === '1' && (isNaN(mediaAvaliacoes) || mediaAvaliacoes === 0)) {
        return true;
      }
  
      // Adicionar buffets com avaliação de 5 estrelas à categoria "4 e 5 Estrelas"
      if (selectedRating === '4' && mediaAvaliacoes === 5) {
        return true;
      }
  
      // Filtros normais baseados nas estrelas
      return !isNaN(mediaAvaliacoes) && mediaAvaliacoes >= lowerLimit && mediaAvaliacoes < upperLimit;
    });
  
    return filteredBuffets;
  };

// ...

const handleFilterClick = (index) => {
  const selectedRating = textos[index].split(' ')[0];
  setSelectedRating(selectedRating);
  // Limpe o termo de pesquisa quando um filtro é aplicado
  setSearchTerm('');
  // Incrementa o valor da chave de atualização para forçar a re-renderização
  setRefreshKey((prevKey) => prevKey + 1);
};


  
  // ...
  
  const filteredBuffetData = filterBuffets(buffetData, selectedRating).filter((buffet) => {
    // Lógica de pesquisa: inclua buffets cujos nomes contenham o termo de pesquisa
    return searchTerm === '' || buffet.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleNotifications = () => {
    navigation.navigate('TelaNotificacoes');
  };

  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil');
  };

  return (
    <View key={refreshKey} style={styles.container}>
      <Navbar navigation={navigation} onMenuPress={toggleMenu}></Navbar>
      <SideMenu isVisible={menuVisible} onClose={toggleMenu} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onEndEditing={handleSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent2}
        >
          <View style={styles.container2}>
            {textos.map((texto, index) => (
              <TouchableOpacity
                key={index}
                style={styles.retanguloComEspacamento}
                onPress={() => handleFilterClick(index)}
              >
                <RetanguloComTexto texto={texto} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.title}>Buffets Próximos a Você</Text>

        <View style={styles.containerCard}>
        {filteredBuffetData.map((buffet, index) => (
            <CardBuffet
              key={index}
              buffetData={buffet}
              avaliacao={buffet.media}
              resetAvaliacao={resetAvaliacao}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const RetanguloComTexto = ({ texto }) => {
  return (
    <View style={styles.retangulo}>
      <Text style={styles.texto}>{texto}</Text>
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

  title:{
    fontSize: 24,
    marginTop: 32,
    marginLeft: 32,
    fontWeight: 'bold',
  },

  containerCard: {
    width: '100%',
    /* 
       width: 360,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    alignSelf:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 32,
    marginVertical:32,

        width: width * 0.9,  // 90% da largura da tela
    paddingVertical: height * 0.02,  // 2% da altura da tela
    paddingHorizontal: width * 0.04,  // 4% da largura da tela
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    alignSelf:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 32,
    marginVertical:32,
    */
  },
  image: {
    width: 330,
    height: 160,
    borderRadius: 10,
    resizeMode: 'contain',
  },

  titleCard:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },

  titleText:{
    fontSize: 32,
    fontWeight: 'bold'
  },

  categorias:{
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

  bottom:{
    width: 330,
    height: 42,
    backgroundColor: '#be3455',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 16, 
  },

  bottomText:{
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
    paddingHorizontal: 16,
  },

  retanguloComEspacamento: {
    marginRight: null, // Adiciona um espaçamento de 8px à direita de cada retângulo
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
  texto: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  scrollContent2:{
    paddingBottom: 5, // Altura da navbar
  }
});

