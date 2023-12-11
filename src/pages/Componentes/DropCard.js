import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../services/UserContext/index';



const DropCard = ({ title, recipes, selectedRecipes, onSelectRecipe, setTotalCost, setSelectedRecipes, numeroConvidados, onRemoveRecipe, }) => {  const [inputText, setInputText] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const { state } = useUser();
  const userId = state.uid;
  
  const removeAccents = (str) => {
    if (str) { 
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    } else {
      return ''; 
    }
  };

  const handleCreateNewRecipe = () => {
    navigation.navigate('CriarReceita')
  };

  const handleSearchRecipe = () => {
    const searchText = removeAccents(inputText.trim().toLowerCase());
  
    if (searchText) {
      const foundRecipes = recipes.filter((recipe) => {
        const recipeName = recipe && recipe.nome && removeAccents(recipe.nome.toLowerCase()); 
        return recipeName && recipeName.includes(searchText); 
      });
  
      if (foundRecipes.length === 0) {
        Alert.alert(
          'Receita não encontrada',
          'Deseja criar uma nova receita?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Criar',
              onPress: () => handleCreateNewRecipe(navigation)
            },
          ]
        );
      } else {
        setSearchedRecipes(foundRecipes);
        setModalVisible(true);
      }
    } else {
      setSearchedRecipes(recipes);
      setModalVisible(true);
    }
  };
  
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);

  const handleAddRecipe = (recipe) => {
    if (recipe && recipe.ingredientes) {
      const recipeId = recipe.id;
  
      const recipeExists = selectedRecipeIds.includes(recipeId);
  
      if (recipeExists) {
        Alert.alert("Receita já foi adicionada");
        setModalVisible(false);
      } else {
        
        setSelectedRecipeIds([...selectedRecipeIds, recipeId]);
        recipe.ingredientes.forEach((ingrediente) => {
          ingrediente.valor = parseFloat(ingrediente.valor);
        });
  
        
        const custoReceitaPorConvidado = calcularCustoTotal(recipe);
  
        
        onSelectRecipe(recipe, custoReceitaPorConvidado);
  
        const id = items.length + 1;
        setItems([...items, { id, recipe }]);
  
        
        setTotalCost((prevTotalCost) => prevTotalCost + custoReceitaPorConvidado);
  
        
        setModalVisible(false);
      }
    } else {
      
      console.error('Recipe or recipe.ingredientes is undefined');
      
    }
  };
  
  

  const calcularCustoTotal = (recipe) => {
    if (recipe && recipe.ingredientes) {
      let custoTotal = 0;
      recipe.ingredientes.forEach((ingrediente) => {
        custoTotal += ingrediente.valor;
      });
      return custoTotal;
    } else {
      return 0; 
    }
  };


  const handleRemoveRecipe = (id, recipe) => {
    const custoReceita = calcularCustoTotal(recipe);

    setTotalCost((prevTotalCost) => prevTotalCost - custoReceita);

    setSelectedRecipeIds((prevSelectedRecipeIds) =>
      prevSelectedRecipeIds.filter((recipeId) => recipeId !== recipe.id)
    );

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    // Remova a receita do estado pai
    onRemoveRecipe(recipe);
  };
  
  
  

  return (
    <View style={styles.containerComp}>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <View style={styles.containerDrop}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
          <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
            <Feather name="plus-circle" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.itemList}>
          {items.map((item) => (
            <View key={item.id} style={[styles.item]}>
              <Text style={{ flex: 1 }}>{item.recipe.nome}</Text>
              <TouchableOpacity onPress={() => handleRemoveRecipe(item.id, item.recipe)}>
                <Feather name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearchRecipe}>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Resultados da Pesquisa</Text>
                <ScrollView>
                  {searchedRecipes.map((recipe) => (
                    <View key={recipe.id} style={styles.modalRecipe}>
                      <Text style={{ flex: 1 }}>{recipe.nome}</Text>
                      {recipe.userId === userId ? (
                        <TouchableOpacity onPress={() => handleAddRecipe(recipe)}>
                          <Text style={{ fontSize: 18, color: 'blue' }}>Sua Receita</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => handleAddRecipe(recipe)}>
                          <Text style={{ fontSize: 18, color: 'green' }}>Adicionar</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  containerComp: {
    width: 360,
    height: 'auto',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  containerDrop: {
    width: 360,
    height: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  itemList: {
    marginTop: 10,
    marginHorizontal: 16,
    width: 'auto',
  },
  item: {
    width: '100%',
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 5,
  },
  searchContainer: {
    width: 340,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    width: 350,
    maxHeight: '85%', 
  },
  
  modalRecipe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default DropCard;
