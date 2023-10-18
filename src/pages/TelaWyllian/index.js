import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AdicionarItem from '../Componentes/AdicionarItem';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      setItems([...items, inputText]);
      setInputText('');
    }
  };

  return (
    <AdicionarItem></AdicionarItem>
  /*  <View>
      <Text>Lista de Itens</Text>
      {items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <TextInput
        placeholder="Digite um item"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Adicionar" onPress={handleAddItem} />
      <AdicionarItem></AdicionarItem>
    </View>*/
  );
}