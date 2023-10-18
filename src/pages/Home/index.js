import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions  } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from '../Componentes/SideMenu';
import BuffetPerfil from '../BuffetPerfil'

const { width, height } = Dimensions.get('window');

const handlePress = () => {
  navigation.navigate('TelaNotificaçoes');
};

const Categoria = ({ text}) => (
  <View tyle={styles.categoriaBox}>
    <Text tyle={styles.categoriaText}>{text}</Text>
  </View>
);




export default function Home({ rating, navigation  }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const textos = ['5 Estrelas', 'Cardapios', '100 pessoas', '2500 R$', '300 pessoas'];

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
      const handleBuffetNavigation = () => {
        navigation.navigate('BuffetPerfil');
      };

  return (

    <View style={styles.container}>
    <View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>Seu Nome</Text>
      </View>
      <View style={styles.rightContainer}>
      <TouchableOpacity onPress={handleNotifications}>
            <Feather name="bell" size={24} marginRight={12} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
      </View>
    </View>

 
 <SideMenu  isVisible={menuVisible} onClose={toggleMenu}></SideMenu>
    
    <ScrollView contentContainerStyle={styles.scrollContent}>

    

    <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          placeholder="Pesquisar..."
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent2}>

      <View style={styles.container2}>
      {textos.map((texto, index) => (
        <View key={index} style={styles.retanguloComEspacamento}>
          <RetanguloComTexto texto={texto} />
        </View>
      ))}
    </View>

    </ScrollView>

      <Text style={styles.title}>Buffets Proximos a você</Text>

  <View style={styles.containerCard}>
      <Image
        source={require('../../../assets/Brownie.png')}
        style={styles.image}
      />

      <View style={styles.titleCard}>
        <Text style={styles.titleText}>Art's Fia Buffet</Text>
        <MaterialIcons name='place' size={30} color="black" marginTop={8}></MaterialIcons>
      </View>

      <View style={styles.rectangle}>
      {renderStars()}
    </View>


    <TouchableOpacity style={styles.bottom} onPress={handleBuffetNavigation}>
      <Text style={styles.bottomText}>Ver Buffet</Text>
    </TouchableOpacity>

  </View>


  </ScrollView>


 </View>

);
};
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

