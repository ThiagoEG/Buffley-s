import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Importe as bibliotecas necessárias

function DropCard({ title, recipes, selectedRecipes, onSelectRecipe }) {
  const [inputText, setInputText] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const handleCreateNewRecipe = () => {
    navigation.navigate('AddReceitas')
  };

  const handleSearchRecipe = () => {
    const searchText = removeAccents(inputText.trim().toLowerCase());

    if (searchText) {
      const foundRecipes = recipes.filter((recipe) => {
        const recipeName = removeAccents(recipe.nome.toLowerCase());
        return recipeName.includes(searchText);
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
              onPress: handleCreateNewRecipe,
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

  const handleAddRecipe = (recipe) => {
    const id = items.length + 1;
    setItems([...items, { id, recipe }]);
    setModalVisible(false);
    onSelectRecipe(recipe, recipe.valor); 
  };

  const handleRemoveRecipe = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
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
              <TouchableOpacity onPress={() => handleRemoveRecipe(item.id)}>
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
                      <TouchableOpacity onPress={() => handleAddRecipe(recipe)}>
                        <Text style={{ fontSize: 18, color: 'green' }}>Adicionar</Text>
                      </TouchableOpacity>
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
    marginHorizontal: 16,
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
    marginTop: 18,
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
  },
  modalRecipe: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default DropCard;
