import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AsyncStorage } from 'react-native';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db} from "../../services/firebaseConfigurations/firebaseConfig"; // Certifique-se de importar suas configurações do Firebase e o Firestore.
import { registerUser } from '../../services/firebaseConfigurations/authUtils'; // Importe a função de registro
import ImagePickerExample from '../Componentes/ImagePicker';
import { useUser  } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebaseConfigurations/firebaseConfig';
import { v4 as uuidv4 } from 'uuid'; // Importe a função v4 da biblioteca uuid
import {  set, push, query, orderByChild, equalTo, get, update, onValue } from 'firebase/database';
export default function Welcome() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errors, setErrors] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [selectedOption, setSelectedOption] = useState('Buffet');
  const [endereco, setEndereco] = useState('');
  const [cnpj, setCnpj] = useState('');
  const navigation = useNavigation();

  const handleImagemChange = (imageUri) => {
    setImageUri(imageUri);
  };

  const handleRegister = async (email, senha, nome, telefone, userType, imagem, endereco, cnpj) => {
    try {
      // Resto do código para verificar se o usuário já está registrado
      // ...
  
      // Se o usuário não existir, prossiga com o registro
      const userCredential = await registerUser(email, senha, nome, telefone, userType, imagem, endereco, cnpj);
      const user = userCredential.user;
  
      // Resto do código para adicionar os dados do usuário ao Firestore
      // ...
  
      console.log('Registro bem-sucedido:', user);
  
      // Enviar dados específicos do buffet para o Firebase Realtime Database

  
      handlePress2();
    } catch (error) {
      console.error('Erro no registro:', error);
  
      if (error.code === 'auth/email-already-in-use') {
        setErrorText('O email já está em uso. Por favor, escolha outro email.');
      } else if (error.code === 'auth/weak-password') {
        setErrorText('A senha é muito fraca. Escolha uma senha mais forte.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorText('O email fornecido é inválido.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorText('O usuário não foi encontrado.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorText('A senha está incorreta.');
      } else if (error.code === 'auth/network-request-failed') {
        setErrorText('Falha na conexão de rede. Verifique sua conexão à internet.');
      } else {
        setErrorText('Ocorreu um erro desconhecido no registro.');
      }
    }
  };

  const handlePress = () => {
    navigation.navigate('SignIn');
  };

  const handlePress2 = () => {
    if (selectedOption === 'Buffet') {
      navigation.navigate('SignIn', { userType: 'Buffet' });
    } else if (selectedOption === 'Cliente') {
      navigation.navigate('SignIn', { userType: 'Cliente' });
    }
  };



  useEffect(() => {
    // Adicione animação de fade-in para o formulário
    setTimeout(() => {
      setFormVisible(true);
    }, 1000);
  }, []);

  const [isFormVisible, setFormVisible] = useState(false);

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

    if (selectedOption === 'Buffet') {
      if (endereco.trim() === '') {
        errors.endereco = 'Campo obrigatório';
      }
      if (cnpj.trim() === '') {
        errors.cnpj = 'Campo obrigatório';
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const cadastrar = async () => {
    const isValid = validateForm();
  
    if (isValid) {
      try {
        if (imageUri) {
          // Se uma imagem foi selecionada
          const uniqueFileName = `${uuidv4()}.jpg`;
          const storageRef = ref(storage, `Imagens/Perfil/Usuarios/${uniqueFileName}`);
  
          const response = await fetch(imageUri);
          const blob = await response.blob();
          await uploadBytes(storageRef, blob);
  
          const imageUrl = await getDownloadURL(storageRef);
  
          // Continue com o registro, passando a URL da imagem e os dados do usuário diretamente
          const userCredential = await registerUser(email, senha, nome, telefone, selectedOption, imageUrl, endereco, cnpj);
  
          // Obtenha o usuário do userCredential
          const user = userCredential?.user;
  
          // Atualizar o nó do usuário no Realtime Database com o caminho da imagem
          const userNodePath = selectedOption === 'Buffet' ? 'buffets' : 'clientes';
          if (user) {
            await set(ref(db, `${userNodePath}/${user.uid}/imagem`), imageUrl);
          }
  
          console.log('Registro bem-sucedido:', user);
          handlePress2();
        } else {
          // Se nenhuma imagem foi selecionada, prosseguir com o registro sem imagem
          handleRegister(email, senha, nome, telefone, selectedOption, null, endereco, cnpj);
        }
      } catch (error) {
        console.error('Erro no upload da imagem:', error);
        setErrorText('Erro no upload da imagem');
      }
    }
  };
  

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.btnInput} onPress={handlePress}>
            <Image style={styles.img} source={require('../../assets/images.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerForm}>
          <Animatable.Text animation="fadeIn" duration={1000} style={styles.title}>
            Crie sua conta
          </Animatable.Text>
          <Text style={styles.errorText}>{errorText}</Text>
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
            placeholder="Email"
            keyboardType="email-address"
            borderColor="#BB2649"
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
          placeholder="Telefone"
          keyboardType="phone-pad"
          borderColor="#BB2649"
          value={telefone}
          onChangeText={setTelefone}
        />
          {selectedOption === 'Buffet' && (
  <>
  
    <TextInput
      borderWidth={1}
      borderRadius={8}
      paddingVertical={2}
      paddingStart={15}
      marginTop={'5%'}
      marginBottom={'5%'}
      style={styles.formText}
      placeholder="Endereço"
      borderColor="#BB2649"
      value={endereco}
      onChangeText={setEndereco}
    />

    <TextInput
      borderWidth={1}
      borderRadius={8}
      paddingVertical={2}
      paddingStart={15}
      style={styles.formText}
      placeholder="CNPJ"
      borderColor="#BB2649"
      value={cnpj}
      onChangeText={setCnpj}
    />
  </>
)}

          <ImagePickerExample setImageUri={setImageUri} onChangeText={handleImagemChange} />

          <View style={styles.radioButtonsContainer}>
            <Animatable.View animation="fadeIn" duration={1000}>
              <View style={styles.radioButtonRow}>
                <Card style={{ width: '40%' }}>
                  <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton
                        value="Buffet"
                        status={selectedOption === 'Buffet' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('Buffet')}
                      />
                      <Text style={{ color: '#BB2649' }}>Buffet</Text>
                    </View>
                  </Card.Content>
                </Card>
                <Card style={{ width: '40%', marginLeft: '10%' }}>
                  <Card.Content>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <RadioButton
                        value="Cliente"
                        status={selectedOption === 'Cliente' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('Cliente')}
                      />
                      <Text style={{ color: '#BB2649' }}>Cliente</Text>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            </Animatable.View>
          </View>
          

          <Animatable.View animation="bounceIn" duration={1000} style={{ width: '100%' }}>
            <TouchableOpacity style={styles.button} onPress={cadastrar}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

          <Text style={styles.title}></Text>

          <TouchableOpacity onPress={handlePress}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#BB2649',
                textDecorationLine: 'underline',
                alignSelf: 'center',
                marginTop: '-10%',
              }}
            >
              Já possui uma conta? Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollContainer:
    {
      backgroundColor: 'white'
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