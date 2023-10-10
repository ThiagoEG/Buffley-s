import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Categoria = ({ text }) => (
  <View style={styles.categoriaBox}>
    <Text style={styles.categoriaText}>{text}</Text>
  </View>
);

const FooterIcon = ({ iconName, label }) => (
  <View style={styles.footerIconContainer}>
    <Icon name={iconName} size={24} color="black" />
    <Text style={styles.footerIconLabel}>{label}</Text>
  </View>
);

export default function Home2() {
  const categoriasData = [];

  const segundoCardData = {
    image: require('../../../assets/Rectangle_128.png'),
    nome: "Art's Fia",
    favorito: true,
    vaga: "Garçom",
    horario: "16 as 21 hrs",
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <Text style={styles.userName}>Criar vaga FreeLancer</Text>
            <Icon style={styles.Icone} name="add" size={24} color="black" />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriasContainer}>
            {categoriasData.map((item) => (
              <Categoria key={item.id} text={item.text} />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.brownieText}>Vagas FreeLancers</Text>
        <Text style={styles.brownieText1}>Perto de você!</Text>

        {/* Primeiro Card */}
        <View style={styles.card}>
          <Image source={require('../../../assets/Rectangle_128.png')} style={styles.cardImage} />

          <View style={styles.brownieContainer}>
            <Text style={styles.brownieText2}>Art's Fia</Text>
            <Icon name="favorite" size={30} color="black" style={styles.heartIcon} />
          </View>

          <View style={styles.squareContainer}>
            <View style={[styles.square, { marginRight: 10 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText1}>Vaga:</Text>
              </View>
            </View>
            <View style={[styles.square, { marginRight: 10 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText3}>Garçom</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={[styles.square, { marginRight: 13 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText4}>Horario:</Text>
              </View>
            </View>
            <View style={[styles.square, { marginRight: 15 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText2}>16 as 21 hrs</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonInsideCard}
              onPress={() => {
                // Lógica a ser executada quando o botão for pressionado
              }}
            >
              <Text style={styles.buttonTextInsideCard}>Ver receita</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Segundo Card */}
        <View style={styles.card}>
          <Image source={segundoCardData.image} style={styles.cardImage} />

          <View style={styles.brownieContainer}>
            <Text style={styles.brownieText2}>{segundoCardData.nome}</Text>
            {segundoCardData.favorito && (
              <Icon name="favorite" size={30} color="black" style={styles.heartIcon} />
            )}
          </View>

          <View style={styles.squareContainer}>
            <View style={[styles.square, { marginRight: 10 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText1}>Vaga:</Text>
              </View>
            </View>
            <View style={[styles.square, { marginRight: 10 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText3}>{segundoCardData.vaga}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={[styles.square, { marginRight: 13 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText4}>Horario:</Text>
              </View>
            </View>
            <View style={[styles.square, { marginRight: 15 }]}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText2}>{segundoCardData.horario}</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonInsideCard}
              onPress={() => {
                // Lógica a ser executada quando o botão for pressionado
              }}
            >
              <Text style={styles.buttonTextInsideCard}>Ver receita</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.extraSpace} />


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({


  extraSpace: {
    height: 100, // Altura suficiente para acomodar o rodapé
  },

  footerContainer: {
    width: 390,
    height: 'auto', // Defina a altura como 'auto' para se ajustar ao conteúdo
    backgroundColor: 'transparent', // Ajuste a cor de fundo conforme necessário
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: -8 }, // Sombra para cima
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 12,
    marginBottom: 20,
  },

  footer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10, // Ajuste o espaçamento vertical
    paddingHorizontal: 20, // Ajuste o espaçamento horizontal
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: -5 }, // Remova a sombra vertical
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 12,
    marginTop: 18,
  },

  footerIconContainer: {
    alignItems: 'center',
    flex: 1, // Preencha o espaço igualmente entre os ícones
  },

  footerIconLabel: {
    marginTop: 5,
    fontSize: 12,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  footerContainer: {
    backgroundColor: 'transparent', // Ajuste a cor de fundo conforme necessário
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: -4 }, // Sombras para cima
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 10, // Raio de borda de 5
  },


  footer: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center', // Centraliza horizontalmente
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 5, height: -8 }, // Sombras para cima
    shadowRadius: 6,
    elevation: 5,
  },
  
  footerIconContainer: {
    alignItems: 'center',
    marginRight: 10, // Adicione margem direita para espaçamento
    flex: 1,
  },
  

  footerIconLabel: {
    marginTop: 5,
    fontSize: 12,
    marginLeft: 5, // Adicione margem esquerda para espaçamento entre ícones
  },

  starIcon: {
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginBottom: 70,
    
  },

  brownieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 8,
    
  },
  

  buttonInsideCard: {
    backgroundColor: '#C93F5E',
    width: 325,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    
  },

  buttonTextInsideCard: {
    color: 'white', // Leave this as it is
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardImage: {
    width: 326,
    height: 156,
    borderRadius: 10,
    marginTop: 75,
  },

  button: {
    backgroundColor: '#C93F5E',
    width: 233,
    height: 41,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  header: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  userName: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: 18,
  },

  searchBar: {
    width: 360,
    height: 35,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  categoria: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginRight: 260,
    marginLeft: 37,
  },

  categoriasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 26,
  },


 

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 19, // Ajuste o espaçamento esquerdo
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 3, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },




  card: {
    width: 358,
    height: 349,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    shadowColor: 'black',
    shadowOpacity: 10,
    shadowOffset: { width: 3, height: 6 },
    shadowRadius: 8,
    elevation: 9,
  },


  


  brownieText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginRight: 177,

  },

  brownieText1: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#cd4465',
    marginRight: 269,

  },

  brownieText2: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    marginRight: 120,


  },

 

  squareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 192,
 
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginRight: 174,
  },

  square: {
    width: 60,
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 174,
   
  },

  heartIcon: {
    marginLeft: 70,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  squareContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  squareText1: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },

  squareText3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#cd4465',
  },

  squareText4: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },

  squareText2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 20,
    color: '#cd4465',
  },

userName: {
  fontWeight: 'bold',
  fontSize: 18,
  marginTop: 30,
},

Icone: {
  marginTop: 32,
  marginLeft: 20,
},




 
});
