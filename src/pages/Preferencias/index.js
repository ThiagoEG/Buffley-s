import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dropdown from '../Componentes/DropDown'

export default function Welcome() {
  const [nome, setNome] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState('');
  const [data, setData] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('HomeScreen');
  };

/*  const handlePress2 = () => {
    if (selectedOption === 'Buffet') {
      // Lógica para o Buffet
    } else if (selectedOption === 'Cliente') {
      // Lógica para o Cliente
    }
  };*/

  const [selectedOption, setSelectedOption] = useState('Buffet');

  const validateForm = () => {
    let errors = {};

    if (nome.trim() === '') {
      errors.nome = 'Campo obrigatório';
    }

    if (qtdPessoas.trim() === '') {
      errors.qtdPessoas = 'Campo obrigatório';
    }

    if (data.trim() === '') {
      errors.data = 'Campo obrigatório';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.sectionTitle}>Dados</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={24} color="#808080" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#808080"
            onChangeText={text => setNome(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="group" size={24} color="#808080" style={styles.icon} />
          <TextInput
            style={styles.inputSmall}
            placeholder="Qtde de Pessoas"
            placeholderTextColor="#808080"
            onChangeText={text => setQtdPessoas(text)}
          />
          <TextInput
            style={styles.inputSmall}
            placeholder="Data"
            placeholderTextColor="#808080"
            onChangeText={text => setData(text)}
          />
        </View>

        <Text style={styles.sectionTitle}>Preferências</Text>

        <Dropdown placeholder="Carnes"></Dropdown>
        <Dropdown placeholder="Bebidas"></Dropdown>
        <Dropdown placeholder="Bolos"></Dropdown>
        <Dropdown placeholder="Entradas"></Dropdown>

      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  containerForm: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    alignSelf: 'center',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#BB2649',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingStart: 15,
    fontSize: 20,
  },
  inputWithIcon: {
    flex: 1,
    borderColor: '#BB2649',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingStart: 15,
    fontSize: 20,
    paddingLeft: 40,
  },
  inputSmall: {
    flex: 1,
    borderColor: '#BB2649',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingStart: 15,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#BB2649',
    borderRadius: 0,
    paddingVertical: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: 10,
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
});
