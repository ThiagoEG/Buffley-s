import react, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { MaterialIcons, Feather } from '@expo/vector-icons';



export default function DropCard( { title } ) {
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

      <View style={styles.containerComp}>
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
          <View  style={styles.containerDrop}> 
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
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

            <View style={styles.searchContainer}>
            <Feather name="search" size={24} color="black" />
            <TextInput
                placeholder="Pesquisar..."
                style={styles.searchInput}
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            </View>

           <TouchableOpacity onPress={handleAddItem} style={[styles.btnAdd]}> 
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white'}}>Adicionar</Text>
           </TouchableOpacity>
         
          </View>
        </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  containerComp:{
    width: 360,
    height: "auto",
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 5,
    marginBottom: 12,
    marginTop:10,
    marginHorizontal: 16,
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
    marginTop: 34,  // Porcentagem em relação à altura
    marginHorizontal: 10,  // Porcentagem em relação à largura
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

  btnAdd:{
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center',
    backgroundColor: '#be3455',
    borderRadius: 5, 
    elevation: 8,
  },
});
