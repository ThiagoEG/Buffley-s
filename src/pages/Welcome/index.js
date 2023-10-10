import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton, Card } from 'react-native-paper';

import Home from '../Home'
import HomeBuffet from '../HomeBuffet'

import axios from 'axios';



export default function Welcome() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SignIn');
  };
/*
  const handlePress2 = () => {
    navigation.navigate('HomeScreen');
  };
*/
  const handlePress2 = () => {
    if (selectedOption === 'Buffet') {
      navigation.navigate('HomeScreenBuffet');
    } else if (selectedOption === 'Cliente') {
      navigation.navigate('HomeScreen');
    }
  };

  const [selectedOption, setSelectedOption] = useState('Buffet');


  const validateForm = () => {
    let errors = {};
  
    if (nome.trim() === '') {
      errors.nome = 'Campo obrigatório';
    }
  
    if (senha.trim() === '') {
      errors.senha = 'Campo obrigatório';
    }
  
    if (email.trim() === '') {
      errors.email = 'Campo obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email inválido';
    }
  
    if (telefone.trim() === '') {
      errors.telefone = 'Campo obrigatório';
    }
  
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
  };
  
  


  const cadastrar = () => {
    const isValid = validateForm();
  
    if (isValid) {
   /*   const data = {
        nome: nome,
        senha: senha,
        email: email,
        telefone: telefone
      };
  
      axios.post(UserModel, data)
        .then(response => {
          // Lida com a resposta da API
          Alert.alert('Cadastro realizado com sucesso!');
          console.log
        })
        .catch(error => {
          // Lida com erros da API
          console.error(error);
        });*/
    }
  };
  
  

  return (

<View style={styles.container}>
<View style={styles.topBar}>
<TouchableOpacity style={styles.btnInput} onPress={handlePress}>
      <Image style={styles.img} source={require('../../assets/images.png')} />
    </TouchableOpacity>
    </View>

  
  
      <View style={styles.containerForm}>

        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.errorText}>{errors.nome}</Text>

<TextInput 

borderWidth={1}
borderRadius={8}
paddingVertical={2}
paddingStart={15}
  style={styles.formText}
  placeholder="Nome"
  borderColor="#BB2649"
  value={nome}
  onChangeText={setNome}
/>
<Text style={styles.errorText}>{errors.senha}</Text>
<TextInput
borderWidth={1}
borderRadius={8}
paddingVertical={2}
paddingStart={15}
  style={styles.formText}
  placeholder="Senha"
  borderColor="#BB2649"
  secureTextEntry
  value={senha}
  onChangeText={setSenha}
/>
<Text style={styles.errorText}>{errors.email}</Text>
<TextInput
borderWidth={1}
borderRadius={8}
paddingVertical={2}
paddingStart={15}
style={styles.formText}
borderColor="#BB2649"
  placeholder="Email"
  keyboardType="email-address"
  value={email}
  onChangeText={setEmail}
/>
<Text style={styles.errorText}>{errors.telefone}</Text>
<TextInput
borderWidth={1}
borderRadius={8}
paddingVertical={2}
paddingStart={15}
style={styles.formText}
borderColor="#BB2649"
  placeholder="Telefone"
  keyboardType="phone-pad"
  value={telefone}
  onChangeText={setTelefone}
/>

<View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', right:'3%', marginTop:'5%' }}>
      <Card style={{ width: '40%'}}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Buffet"
              status={selectedOption === 'Buffet' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('Buffet')}
            />
            <Text style={ {color: '#BB2649'}}>Buffet</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ width: '40%', marginLeft:'10%' }}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="Cliente"
              status={selectedOption === 'Cliente' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('Cliente')}
            />
            <Text style={ {color: '#BB2649'}}>Cliente</Text>
          </View>
        </Card.Content>
      </Card>





      {/* Adicione aqui seu código de botão ou qualquer outra coisa */}
    </View>

              <TouchableOpacity style={styles.button} onPress={handlePress2}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.title}></Text>

      <TouchableOpacity onPress={handlePress}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#BB2649', textDecorationLine: 'underline', alignSelf:'center', marginTop:'-10%' }}>
        Já possui uma conta? Entrar
        </Text>
      </TouchableOpacity>


      </View>

      
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 70,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      shadowColor: 'black', // Cor da sombra
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 5,
      shadowRadius: 2,
      elevation: 8,
    },
    container2:{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', },
    containerLogo:{
        flex:2,

    },
    containerForm:{
        flex:2,
        paddingStart: '5%',
        paddingEnd:'5%',
        backgroundColor:'#FFF'
    },
    img:{
      marginTop:15,
      width:50,
      height:50
    },

    title:{
        fontSize: 24,
        fontWeight:'bold',
        marginTop:28,
        marginBottom:12,
        alignSelf:'center',
        color:"black"
    },

    formText:
    {
      borderWidth: 1,
      borderColor: '#bfbfbf',
      paddingVertical:10
    },
    button:{

        marginTop: '5%',
        backgroundColor:'#BB2649',
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        height: 51.42,
        alignSelf: 'center',
        allignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize: 18,
        color:'#FFF',
        fontWeight:'bold',
        alignSelf:'center'
    },
    line: { 
      flex: 1,
       height: 1,
        backgroundColor: '#be3455',
         margin:20 },

          middleText:
           { paddingHorizontal: 10,
             fontSize: 18,
              fontWeight: 'bold',
               color: '#be3455',
               },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginTop: 5,
    },    
    
  radioButtonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

})