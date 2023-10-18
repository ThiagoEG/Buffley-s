import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerComp}>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <View  style={styles.containerDrop}> 
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Lista de Itens</Text>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
              <Feather name="plus-circle" size={35} color="black" />
            </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed}>
        {items.map((item, index) => (
          <View key={index} style={[styles.textComp]}>
            <Text style={{ flex: 1 }}>{item}</Text>
            <TouchableOpacity onPress={() => handleDeleteItem(index)}>
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ flexDirection: 'column',}}>
          <TextInput
            style={[styles.input]} // Adicione o estilo input
            placeholder="Digite um item"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <Button title="Adicionar" onPress={handleAddItem} />
        </View>
      </Collapsible>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerComp:{
    width: 360,
    height: "auto",
    left: 16,
    right:16,
    backgroundColor: 'white',
    elevation: 2,

  },
  containerDrop:{
    width: 360,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent:'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation:8,
    paddingLeft: 16,
    paddingRight: 16,


  },

  textComp:{
    width: 340,
    height: 30,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    alignItems: 'center',

  },

  input: {
    width: '100%', // Adicione uma altura mínima
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginVertical: 16,
  },
});
