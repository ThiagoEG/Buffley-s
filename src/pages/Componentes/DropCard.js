import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Entradas from '../ReceitasBanco/Entradas';
import PratosPrincipais from '../ReceitasBanco/PratosPrincipais';
import Acompanhamentos from '../ReceitasBanco/Acompanhamentos';

export default function DropCard({ title, onSelectRecipe, recipes }) {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddItem = (newRecipe) => {
    if (newRecipe.trim() !== '') {
      setItems([...items, newRecipe]);
      setInputText('');
    }
  };
  

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  const navigation = useNavigation();
  const handleSearch = () => {
    const query = inputText.toLowerCase();
    const results = recipes.filter((item) => item.nome.toLowerCase().includes(query));
    setSearchResults(results);

    if (results.length === 0) {
      Alert.alert(
        'Nenhum resultado encontrado',
        'Deseja criar uma nova receita?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Criar Receita',
            onPress: () => {
              navigation.navigate('CriarReceita')
            },
          },
        ]
      );
    } else {
      setIsModalVisible(true);
    }
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
        {items.map((item, index) => (
          <View key={index} style={styles.textComp}>
            <Text style={{ flex: 1 }}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(index)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ flexDirection: 'column' }}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" />
            <TextInput
              placeholder="Pesquisar..."
              style={styles.searchInput}
              value={inputText}
              onChangeText={(text) => setInputText(text)}
            />
          </View>

          <TouchableOpacity onPress={handleSearch} style={styles.btnAdd}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Pesquisar</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Resultados da pesquisa:</Text>
              {searchResults.map((result, index) => (
                <View key={index} style={styles.resultItem}>
                  <Text style={{ fontSize: 16, flex: 1 }}>{result.nome}</Text>
                  <TouchableOpacity
  onPress={() => {
    onSelectRecipe(result);
    setIsModalVisible(false);
    handleAddItem(result.nome); // Adicione a receita atual
  }}
>
  <Text style={styles.resultItemText}>Adicionar</Text>
</TouchableOpacity>
                </View>
              ))}
              <Button
  title="Fechar"
  onPress={() => setIsModalVisible(false)}
  color="#be3455" // Define a cor do botão
  style={styles.closeButton} // Adicione uma classe de estilo para o botão
/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  containerComp: {
    width: 360,
    height: "auto",
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 10,
    marginHorizontal: 16,
  },
  containerDrop: {
    width: 360,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },

  textComp: {
    width: 340,
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
  },

  searchContainer: {
    width: 340,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 34,
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
  btnAdd: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#be3455',
    borderRadius: 5,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultItemText: {
    color: '#be3455',
  },
  closeButton: {
    backgroundColor: 'transparent', // Define o fundo como transparente
    color: '#be3455', // Define a cor do texto
    fontWeight: 'bold', // Define a espessura da fonte
    fontSize: 18, // Define o tamanho da fonte
  },
});
