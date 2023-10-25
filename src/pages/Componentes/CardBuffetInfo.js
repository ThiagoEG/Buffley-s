import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearButton from './LinearButton';
import { useNavigation } from '@react-navigation/native';



const CardInfo = ({
  nome,
  custoMaisBarato,
  custoMaisCaro,
  quantidadeItens,
  categoriaMaisBarata,
  categoriaMaisCara,
  totalCost, // Adicione totalCost como propriedade
  numeroConvidados, // Adicione numeroConvidados como propriedade
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.cardInfoContainer}>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center',}}>
        <Text style={styles.cardName}>{nome}</Text>
        <MaterialIcons name={'star'} size={35} color={'#318051'} />
      </View>
        <View style={{ flexDirection: 'row', width: 'auto', height: 'auto' }}>
        <View style={styles.retangulo}>
          <Text style={styles.textRec}>{numeroConvidados} pessoas</Text>
        </View>
        <View style={styles.retangulo}>
          <Text style={styles.textRec}>R$ {totalCost.toFixed(2)}</Text>
        </View>
        </View>
        <View style={styles.containerInfo}>
        <Text style={styles.infoText}>Quantidade de itens: {quantidadeItens}</Text>
        <Text style={styles.infoText}>Custo mais barato: {categoriaMaisBarata ? `(${categoriaMaisBarata})` : ''} R$ {custoMaisBarato.toFixed(2)}</Text>
        <Text style={styles.infoText}>Custo mais caro: {categoriaMaisCara ? `(${categoriaMaisCara})` : ''} R$ {custoMaisCaro.toFixed(2)}</Text>
      </View>
      <LinearButton
  title="Ver"
  onPress={() => navigation.navigate('Cardapio', { cardapioItens: itensDoCardapio })}
/>



    </View>
  );
};

const styles = StyleSheet.create({
  cardInfoContainer: {
    width: '85%',
    height: 'auto',
    backgroundColor: 'white',
    elevation: 2,
    padding: 16,
    marginBottom: 16,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 22,
  },
  cardName: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 4,
  },

  retangulo: {
    width: 100,
    height: 35,
    marginTop: 12,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  containerInfo:{
    width: 'auto',
    height: 'auto',
    marginTop:12,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,

  }
});

export default CardInfo;
