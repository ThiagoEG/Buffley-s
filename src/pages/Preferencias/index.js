import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dropdown from '../Componentes/DropDown'
import LinearBorder from '../Componentes/LinearBorder';
import DatePickerComponent from '../Componentes/DataPicker';
import Navbar from '../Componentes/Navbar';
import MultiSelectComponent from '../Componentes/DropDonwSelect';
import { tiposDeCarnes, bebidas, bolos, entradas, saladas, guarnicoes } from '../../Banco/PreferenciasBanco';

export default function Welcome() {
  const [nome, setNome] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState('');
  const [data, setData] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const item = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
   
  ];

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
      <Navbar/>
      <View style={styles.containerForm}>
        <Text style={styles.sectionTitle}>Dados</Text>

        <LinearBorder icon="person" placeholder="Nome do Cardápio" 
          onChangeText={text => setNome(text)}
        />

        <View style={{flexDirection: "row"}[styles.componets]}>
          <LinearBorder icon="groups" placeholder="Quantidade de pessoas" 
            onChangeText={text => setQtdPessoas(text)} 
            keyboardType="numeric"
          />
          <DatePickerComponent onChangeText={text => setQtdPessoas(text)} />
        </View>

        
        <Text style={[styles.sectionTitle1]}>Preferências</Text>

        <MultiSelectComponent placeholder="Carnes" data={tiposDeCarnes}/>
        <MultiSelectComponent placeholder="Bebidas" data={bebidas}/>
        <MultiSelectComponent placeholder="Bolos" data={bolos}/>
        <MultiSelectComponent placeholder="Entradas" data={entradas}/>
        <MultiSelectComponent placeholder="Guarnições" data={guarnicoes}/>
        <MultiSelectComponent placeholder="Saladas" data={saladas}/>
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
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 16,
    color: 'black',
  },
  sectionTitle1:{
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: 16,
    color: 'black',
    marginBottom: 16,
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
  componets:{
    width: '100%',
    flexDirection: "row"
  }
});
