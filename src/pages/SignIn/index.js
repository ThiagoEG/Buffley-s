import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function SignIn() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Welcome');
  };
  const handlePress2 = () => {
    navigation.navigate('HomeScreen');
  };

  const validateForm = () => {
    let errors = {};

    if (nome.trim() === '') {
      errors.nome = 'Campo obrigatório';
    }

    if (senha.trim() === '') {
      errors.senha = 'Campo obrigatório';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Após um atraso de 1000ms, exibe o formulário com uma animação de slide-in.
    setTimeout(() => {
      setIsFormVisible(true);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require('../../../assets/Buffley.png')}
        style={styles.image}
        animation="fadeIn" // Adicionamos uma animação de fade-in
        duration={2000}
      />
      <Text style={styles.text}></Text>

      {isFormVisible && (
        <Animatable.View
          style={styles.containerForm}
          animation="slideInUp" // Adicionamos uma animação de slide-in
          duration={1000}
        >
          <Text style={styles.errorText}>{errors.nome}</Text>
          <TextInput
            borderWidth={1}
            borderColor="#BB2649"
            borderRadius={8}
            paddingVertical={2}
            paddingStart={15}
            style={styles.formText}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
            top="-30%"
          />

          <Text style={styles.errorText}>{errors.senha}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              width={'100%'}
              borderWidth={1}
              borderColor="#BB2649"
              borderRadius={8}
              paddingVertical={2}
              paddingStart={15}
              style={styles.formText}
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={setSenha}
              top="-28%"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#BB2649"
                style={{ marginLeft: 10 }}
                top = {height * -0.18}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handlePress2}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <TouchableOpacity style={styles.button2} onPress={handlePress}>
            <Text style={styles.buttonText2}>Cadastrar</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: { flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  containerLogo: {
    flex: 2,
    backgroundColor: '#fffafa',
  },
  containerForm: {
    flex: 2,
    backgroundColor: '#FFF',
    paddingStart: '10%',
    paddingEnd: '10%',
  },
  img: {
    marginTop: 15,
    width: "100%",
    height: "100%",
  },

  image: {
    marginTop: '10%',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },

  text: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'courgette-regular',
    color: '#be3455',
    marginBottom: 80,
    alignSelf: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    alignSelf: 'center',
    color: '#be3455',
    top: '-35%'
  },

  formText: {
    borderWidth: 2,
    borderColor: '#BB2649',
    paddingVertical: 6,
  },
  button: {
    marginTop: '10%',
    backgroundColor: '#BB2649',
    borderRadius: 10,
    paddingVertical: 15,
    width: '95%',
    height: "18%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:'35%'
  },
  button2: {
    bottom: '25%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor:'#BB2649',
    width: '95%',
    height: "18%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#BB2649',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#be3455',
    margin: 20,
  },
  middleText: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#be3455',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  line: { 
     height:5,
      backgroundColor: 'gray',
      bottom:'30%',
      width:"70%",
      alignSelf:'center'
      },
});
