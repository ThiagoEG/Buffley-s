import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, StatusBar, SectionList } from 'react-native';
import LinearButton from '../Componentes/LinearButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { useCardapio } from '../../services/CardapioContext'; // Importe o contexto
import Navbar from '../Componentes/NavBarD';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ref, set } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { color } from 'react-native-reanimated';

export default function DetalhesCardapio({ route, navigation }) {
  const { novoCardapio, selectedRecipes } = route.params;
  const [mostrarReceitas, setMostrarReceitas] = useState(true);
  const [ingredientes, setIngredientes] = useState([]);



  const toggleMostrarReceitas = () => {
    setMostrarReceitas(true);
  };

  const toggleMostrarIngredientes = () => {
    setMostrarReceitas(false);
  };




  const VoltarHome = () => {
    navigation.navigate('Cardapios');
  };

  useEffect(() => {
    if (selectedRecipes) {
      const mergedIngredients = mergeIngredients(selectedRecipes);
      setIngredientes(mergedIngredients);
    }
  }, [selectedRecipes]);

  const mergeIngredients = (recipes, shouldMerge) => {
    if (!recipes) {
      return [];
    }
  
    if (shouldMerge) {
      const merged = {};
  
      recipes.forEach((recipe) => {
        recipe.ingredientes.forEach((ingrediente) => {
          const nome = ingrediente.nome;
  
          if (!merged[nome]) {
            merged[nome] = multiplyIngredients({ ...ingrediente }, novoCardapio.numeroConvidados);
          } else {
            merged[nome] = {
              ...merged[nome],
              quantidade: {
                ...merged[nome].quantidade,
                valor: merged[nome].quantidade.valor + multiplyIngredients(ingrediente, novoCardapio.numeroConvidados).quantidade.valor,
              },
            };
            merged[nome].valor += multiplyIngredients(ingrediente, novoCardapio.numeroConvidados).valor;
          }
        });
      });
  
      const mergedList = Object.values(merged);
      return mergedList;
    } else {
      return recipes.reduce((acc, recipe) => acc.concat(recipe.ingredientes.map((ingrediente) => multiplyIngredients({ ...ingrediente }, novoCardapio.numeroConvidados))), []);
    }
  };
  


  const multiplyIngredients = (ingredient, numeroConvidados) => {
    // Ensure that ingredient and ingredient.quantidade are defined
    if (ingredient && ingredient.quantidade) {
      return {
        ...ingredient,
        quantidade: {
          ...ingredient.quantidade,
          valor: ingredient.quantidade.valor * numeroConvidados,
        },
        valor: ingredient.valor * numeroConvidados,
      };
    }
    return ingredient;
  };

  useEffect(() => {
    if (novoCardapio && novoCardapio.selectedRecipes) {
      const totalCost = novoCardapio.selectedRecipes.reduce((acc, recipe) => {
        const recipeCost = recipe.ingredientes.reduce((recipeAcc, ingrediente) => {
          const multipliedIngredient = multiplyIngredients(ingrediente, novoCardapio.numeroConvidados);
          return recipeAcc + multipliedIngredient.valor;
        }, 0);
        return acc + recipeCost;
      }, 0);
  
      // Atualize o custo total em novoCardapio
      setNovoCardapio((prev) => ({ ...prev, totalCost }));
    }
  }, [novoCardapio]);
  
  
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
      <StatusBar hidden={false} />
      <Navbar title="Detalhes Cardápio" />
      <ScrollView>
      <View style={styles.containerInfo}>
        <View style={styles.containerDetalhes}>

            <Text style={styles.nome}>Nome do Cardapio:</Text>
            <Text style={styles.cardapioNome}>{novoCardapio.nomeCardapio}</Text>
          
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.nome}>Quantidade de Convidados:</Text>
            <Text style={styles.cardapioNome}>{novoCardapio.numeroConvidados}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.nome}>Valor do Cardápio:</Text>
            <Text style={[styles.cardapioNome, { color: 'green' }]}>
  R$ {novoCardapio.totalCost.toFixed(2)}
</Text>

          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.nome}>Data:</Text>
            <Text style={styles.cardapioNome}>{novoCardapio.data}</Text>
          </View>
        </View>
      </View>

      <View style={styles.containers}>
        <TouchableOpacity style={styles.buttons} onPress={toggleMostrarReceitas}>
          <Text style={styles.buttonText} onPress={toggleMostrarReceitas}> Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleMostrarIngredientes}>
          <Text style={styles.buttonText } onPress={toggleMostrarIngredientes}>Ingredientes</Text>
        </TouchableOpacity>
      </View>
      
      
      {mostrarReceitas ? (
        <View style={styles.containerInfoR}>
        <View style={styles.ingredienteContainer}>
        <FlatList
  style={styles.flatcont}
  data={selectedRecipes}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.receitaContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.receitaNome}>{item.nome}</Text>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
        {item.ingredientes.map((ingrediente, index) => {
          const multipliedIngredient = multiplyIngredients(ingrediente, novoCardapio.numeroConvidados);
          return (
            <Text key={index} style={styles.ingredienteItem}>
              {`${multipliedIngredient.nome} - ${multipliedIngredient.quantidade.valor} ${multipliedIngredient.quantidade.unidade} - R$ ${multipliedIngredient.valor.toFixed(2)}`}
            </Text>
          );
        })}
      </View>
    </View>
  )}
/>

        </View>
        </View>
      ) : (
        <View style={styles.containerInfoI}>
        <View style={styles.ingredienteContainer}>
        <FlatList
          style={styles.flatcont}
          data={mergeIngredients(selectedRecipes, true)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
              <Text style={styles.ingredienteItem}>
                {`${item.nome} - ${item.quantidade.valor} ${item.quantidade.unidade} - R$ ${item.valor.toFixed(2)}`}
              </Text>
              
          )}
        />
        </View>
        </View>
      )}

 </ScrollView>
      <View style={{ padding: 16, }}>
        <LinearButton onPress={VoltarHome} title="Ok" />
      </View>

     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  containerDetalhes: {
    padding: 16,
    marginTop: -20,
    width: '100%',

  },
  nome: {
    fontSize: 22,
    marginTop: 12,
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
    fontSize: 22,
    marginVertical: 5,
    marginLeft: 22,
  },

  ingredientesTitulo: {
    fontSize: 18,
    fontWeight: '200',
    marginBottom: 8,
    marginLeft: 16,
    color: '#ff5e006c'
  },

  ingredienteContainer: {
    marginTop: 12,
},
  ingredienteItem: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000',
    marginLeft: 18,
  },
  input: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 20,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    borderWidth: 2,
    height: 40,
    paddingLeft: 16,
    marginTop: 12,
  },
  
  contBtn: {
    flexDirection: 'row',
    marginVertical: 10,
    width: '85%',
    height: 45,
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },

  containerInfo: {
    padding: 16,
    elevation: 4,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  containerInfoR: {
    padding: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#ff5e006c',  // Adicione essa linha
    borderWidth: 2,  // Adicione essa linha
    marginBottom: 10,
  },
  containerInfoI: {
    padding: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#B01455',  // Adicione essa linha
    borderWidth: 2,  // Adicione essa linha
    marginBottom: 16,
  },

  containers: {
    flexDirection: 'row',
    padding: 18,
    marginBottom: 8,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-between'
  },
  
  button: {
    borderWidth: 1,
    padding: 12,
    flex: 1,
    borderColor: '#B01455',
    width: 150,
  },
  buttons: {
    borderWidth: 1,
    padding: 12,
    flex: 1,
    borderColor: '#f25022',
    width: 150,
  },
  
  buttonText: {
    textAlign: 'center',
  },

});
