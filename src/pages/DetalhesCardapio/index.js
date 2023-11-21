import React, {useState, useEffect} from 'react';
import { View, Text, Button, SectionList, StyleSheet, StatusBar } from 'react-native';
import LinearButton from '../Componentes/LinearButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { useCardapio } from '../../services/CardapioContext'; // Importe o contexto
import Navbar from '../Componentes/Navbar';

export default function DetalhesCardapio({ route, navigation }) {
    const { novoCardapio, selectedRecipes } = route.params;

    const VoltarHome = () => {
      navigation.goBack();
      
    };
      
      
  // Agrupe as receitas selecionadas por categoria manualmente
  const groupedRecipes = {};

  // Check if selectedRecipes is defined before using it
  if (selectedRecipes) {
    selectedRecipes.forEach((recipe) => {
      const categoria = recipe.categoria;
      if (!groupedRecipes[categoria]) {
        groupedRecipes[categoria] = [];
      }
      groupedRecipes[categoria].push(recipe);
    });
  }
  

  return (
    <View style={styles.container}>
      <StatusBar hidden={false}/>
      <Navbar/>
      <View style={{ padding: 16 }}>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nome}>Nome do Cardapio:</Text>
          <Text style={styles.cardapioNome}>{novoCardapio.nomeCardapio}</Text>
        </View>
  
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nome}>Quantidade de Convidados:</Text>
          <Text style={styles.cardapioNome}>{novoCardapio.numeroConvidados}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nome}>Valor do Cardápio:</Text>
          <Text style={styles.cardapioNome}>R$ {novoCardapio.totalCost}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nome}>Data:</Text>
          <Text style={styles.cardapioNome}>{novoCardapio.data}</Text>
        </View>
      </View>
  
      {/* Renderize as receitas selecionadas agrupadas por categoria */}
      <SectionList
        sections={Object.keys(groupedRecipes).map((categoria) => ({
          title: categoria,
          data: groupedRecipes[categoria],
        }))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.receitaContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.receitaNome}>{item.nome}</Text>
              <Text style={styles.receitaNome}>R$ {item.valor}</Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
              {item.ingredientes.map((ingrediente, index) => (
               <Text key={index} style={styles.ingredienteItem}>
               {`${ingrediente.nome} - ${ingrediente.quantidade} - R$ ${ingrediente.valor}`}
             </Text>
              ))}
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.categoriaTitulo}>{title}</Text>
        )}
      />
  
      <LinearButton onPress={VoltarHome} title="Ok" />
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nome:{
    fontSize: 22,
    marginTop:12,
    fontWeight: 'bold',
  },
  cardapioNome: {
    fontSize: 24,
    fontWeight: '400',
    marginLeft: 16,
    marginTop: 12,
  },
  categoriaTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    backgroundColor: '#be345422',
    borderRadius: 5,
    paddingLeft: 16,
    paddingVertical: 5,
    width: '100%',
  },
  receitaNome: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 22,
  },

  ingredientesTitulo:{
    fontSize: 18,
    fontWeight: '200',
    marginBottom:8,
    marginLeft: 16,
    color: '#ff5e006c'
  },

  ingredienteItem:{
    marginLeft: 26,
  },

  input:{
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    borderWidth: 2,
    height: 40,
    paddingLeft: 16,
    marginTop: 12,
  }
});
