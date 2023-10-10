/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Navbar from '../componentes2/Navbar2';
import Imagem from '../componentes2/Imagem2.js';
import Meio from '../componentes2/Meio3.js';
import Botão from '../componentes2/Botão2.js';
import Stars from '../componentes2/Stars2.js';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Categoria = ({ text}) => (
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

export default function Home({ rating }) {

  const textos = ['5 Esctrelas', 'Cardapios', '100 pessoas', '2500 R$', '300 pessoas'];

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <View key={i} style={styles.starContainer}>
              <Icon
                name={i <= rating ? 'star_border' : 'grade'}
                size={30}
                color={i <= rating ? 'gold' : 'gray'}
              />
            </View>
          );
        }
        return stars;
      };

  return (

    <View style={styles.container}>
    <View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>Seu Nome</Text>
      </View>
      <View style={styles.rightContainer}>
        <Feather name="bell" size={24} marginRight={12} color="black" />
        <Feather name="menu" size={24} marginRight={12} color="black" />
      </View>
    </View>

    
    <ScrollView contentContainerStyle={styles.scrollContent}>

    <Text style={styles.title}>Cardapios solicitados</Text>

      <Meio/>
      <Botão/>
  </ScrollView>


 </View>

);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'white',
  // Para o Google Pixel 2
  width: 1180 / 2.75,
  height: 1920 / 2.75,
  alignSelf: 'center',
},
topBar: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 70,
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
    marginTop: 20, // Espaçamento entre a top bar e a barra de pesquisa
    marginHorizontal: 32,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    left: 32,
    marginTop: 32,
    marginVertical:32,
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

*/

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../Componentes/card';

const textos = ['300 pessoas', '2,500', '22/05/23'];
  
const card = {
  itens: '15 Itens',
  maisBarato: 'Salada, 100R$',
  maisCaro: 'Prato principal, 700R$',
};

const RetanguloComTexto = ({ texto }) => {
    return (
      <View style={styles.retangulo}>
        <Text style={styles.texto}>{texto}</Text>
      </View>
    );
  };

export default function HomeBuffet({  }) {

    return(

    <View style={styles.container}>
    <View style={styles.topBar}>
      <View style={styles.leftContainer}>
        <Text style={styles.username} marginLeft={12}>Seu Nome</Text>
      </View>
      <View style={styles.rightContainer}>
        <Feather name="bell" size={24} marginRight={12} color="black" />
        <Feather name="menu" size={24} marginRight={12} color="black" />
      </View>
    </View>
    
    <Text style={styles.title}>Cardápio Solicitados</Text>

     <View style={styles.retangulo1}>
        <View style={styles.titleSol}>
          <Image source={require('../../../assets/imgPessoas.png') }style={styles.imagem}/>

           <View style={styles.titleSol2}>
             <Text style={styles.title1}>Joana</Text>
             <Text style={styles.title2}>150 pessoas</Text>
           </View>

        </View>
        <TouchableOpacity>
        <Image source={require('../../../assets/MenuDots.png') }style={styles.imagemIcon}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Seus cardápios</Text>

      <View style={styles.containerCard}>

<View style={styles.titleCard}>
  <Text style={styles.titleText}>Art's Fia Buffet</Text>
  <Icon name='star' size={30} color="green" marginTop={8}></Icon>
</View>

<View style={styles.container2}>
{textos.map((texto, index) => (
  <View key={index} style={styles.retanguloComEspacamento}>
    <RetanguloComTexto texto={texto} />
  </View>
))}
</View>

<View >
<Card
  itens={card.itens}
  maisBarato={card.maisBarato}
  maisCaro={card.maisCaro}
/>
</View>

<TouchableOpacity style={styles.bottom}>
<Text style={styles.bottomText}>Visualizar</Text>
</TouchableOpacity>

</View>


    </View>

    

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      // Para o Google Pixel 2

    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 70,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    left: 32,
    marginTop: 32,
    marginVertical:32,
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
    paddingHorizontal: 0,
  },

  retanguloComEspacamento: {
    marginLeft:'-5%'
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
  },

  retangulo1: {
    width: 360,
    height: 75,
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    borderRadius: 5,

    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 12,
  },

  titleSol:{
    alignContent: 'center',
    flexDirection: 'row',
  },

  titleSol2:{
    alignContent: 'center',
    marginLeft: 10,
  },

  title1:{
    fontSize: 24,
    fontWeight: 'bold',
  },

  title2:{
    fontSize: 16,
    fontWeight: '400',
    color: '#F27288',
  },

  imagemIcon:{
    resizeMode: "contain",
    marginRight: 16,

  }
});