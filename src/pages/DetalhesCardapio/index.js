import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, StatusBar, SectionList } from 'react-native';
import LinearButton from '../Componentes/LinearButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { useCardapio } from '../../services/CardapioContext'; // Importe o contexto
import Navbar from '../Componentes/NavBarD';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ref, set } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";

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
            // Se não existe, adiciona o ingrediente à lista
            merged[nome] = { ...ingrediente };
          } else {
            // Se já existe, soma a quantidade ao ingrediente existente
            merged[nome].quantidade.valor += ingrediente.quantidade.valor;
            // Não esqueça de somar o valor também, se necessário
            merged[nome].valor += ingrediente.valor;
          }
        });
      });

      // Convertendo o objeto novamente para uma lista
      const mergedList = Object.values(merged);
      return mergedList;
    } else {
      // If shouldMerge is false, return the unmerged list
      return recipes.reduce((acc, recipe) => acc.concat(recipe.ingredientes), []);
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
        // ... rest of your code
      });

      // Update the total cost in novoCardapio
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

      <View style={{ padding: 16, marginTop: -20 }}>

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
          <Text style={styles.cardapioNome}>R$ {novoCardapio.totalCost.toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nome}>Data:</Text>
          <Text style={styles.cardapioNome}>{novoCardapio.data}</Text>
        </View>
      </View>

      <View style={{width: '100%', borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.5)'}}/>

      <View style={styles.contBtn}>
        <Button  title='Mostrar Receitas' onPress={toggleMostrarReceitas}/>
        <Button  title='Mostrar Ingredientes' onPress={toggleMostrarIngredientes}/>
      </View>

      {mostrarReceitas ? (
        <SectionList
          sections={Object.keys(groupedRecipes).map((categoria) => ({
            title: categoria,
            data: groupedRecipes[categoria].map((recipe) => ({
              ...recipe,
              ingredientes: recipe.ingredientes.map((ingredient) =>
                multiplyIngredients(ingredient, novoCardapio.numeroConvidados)
              ),
            })),
          }))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.receitaContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.receitaNome}>{item.nome}</Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.ingredientesTitulo}>Ingredientes:</Text>
                {item.ingredientes.map((ingrediente, index) => (
                  <Text key={index} style={styles.ingredienteItem}>
                    {`${ingrediente.nome} - ${ingrediente.quantidade && ingrediente.quantidade.valor} ${ingrediente.quantidade && ingrediente.quantidade.unidade} - R$ ${ingrediente.valor.toFixed(2)}`}
                  </Text>
                ))}
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.categoriaTitulo}>{title}</Text>
          )}
        />
      ) : (
        <FlatList
          style={styles.flatcont}
          data={mergeIngredients(selectedRecipes, true).map((ingredient) =>
            multiplyIngredients(ingredient, novoCardapio.numeroConvidados)
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.ingredienteContainer}>
              <Text style={styles.ingredienteItem}>
                {`${item.nome} - ${item.quantidade.valor} ${item.quantidade.unidade} - R$ ${item.valor.toFixed(2)}`}
              </Text>
            </View>
          )}
        />
      )}

      <View style={{padding:16,}}>
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
    marginLeft: 20,
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
  flatcont: {
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

});
