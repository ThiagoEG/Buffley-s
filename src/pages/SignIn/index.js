import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../services/firebaseConfigurations/firebaseConfig";
import { ref, get } from 'firebase/database';
import { useUser  } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import { Feather, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Navbar from '../Componentes/Navbar';

const { width, height } = Dimensions.get('window');

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { userType } = route.params || {};
  const { dispatch } = useUser()

  const handleLogin = async (username) => {
    try {
      const authInstance = getAuth();
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
      const user = userCredential.user;

      if (user) {
        // User is authenticated in Firebase Authentication

        // Query the database to get the userType based on the user's UID
        const userRef = ref(db, 'users/' + user.uid);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const userType = userData.userType;
          const username = userData.nome; // Assuming the field is named "nome"

          console.log('User Type:', userType);
          console.log('Username:', username);
          console.log('UID do usuário após o login:', user.uid);

          dispatch({ type: 'SET_USER', payload: { uid: user.uid, username } });
          // Continue with navigation to the next screen
          handlePress2(userType, username, user.uid);
        } else {
          console.error('User data not found.');
        }
      } else {
        console.error('User not authenticated. Login not allowed.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handlePress2 = (userType, username, user) => {
    console.log('User Type:', userType);
    if (userType === 'Buffet') {
      console.log('Redirecting to HomeScreenBuffet');
      navigation.navigate('HomeScreenBuffet', { username });
    } else if (userType === 'Cliente') {
      console.log('Redirecting to HomeScreen');
      navigation.navigate('HomeScreen', { uid: user.uid });
    }
  };

  const handlePress = (userType, username) => {
      navigation.navigate('Welcome');
    
  };

  const validateForm = async () => {
    let newErrors = {};
  
    if (email.trim() === '') {
      newErrors.email = 'Campo obrigatório';
    }
  
    if (password.trim() === '') {
      newErrors.password = 'Campo obrigatório';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        if (user) {
          // O usuário está autenticado no Firebase Authentication
          // Você pode prosseguir com o login ou navegar para a próxima tela.
          handleLogin();
        } else {
          // Usuário não autenticado
          newErrors.email = 'Login não existe. Verifique suas credenciais.';
          newErrors.password = 'Erro no login. Tente novamente mais tarde.';
        }
      } catch (error) {
        console.error('Erro no login:', error);
  
        if (error.code === 'auth/invalid-email') {
          newErrors.email = 'Email inválido. Verifique o formato do email.';
        } else if (error.code === 'auth/user-not-found') {
          newErrors.email = 'Email não registrado. Cadastre-se primeiro.';
        } else if (error.code === 'auth/wrong-password') {
          newErrors.password = 'Senha incorreta. Tente novamente.';
        } else if (error.code === 'auth/network-request-failed') {
          newErrors.email = 'Erro na conexão de rede. Verifique sua conexão à internet.';
        } else if (error.code === 'auth/invalid-login-credentials') {
          newErrors.email = 'Credenciais de login inválidas. Verifique seu email e senha.';
        } else {
          newErrors.email = 'Ocorreu um erro desconhecido no login.';
        }
      }
    }

    // Atualize os erros somente após a validação
    setErrors(newErrors);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // Após um atraso de 1000ms, exiba o formulário com uma animação de entrada.
    setTimeout(() => {
      setIsFormVisible(true);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <Animatable.Image
          source={require('../../../assets/Buffley.png')}
          style={styles.image}
          animation="fadeIn"
          duration={2000}
        />
      </View>
      <View style={styles.BottomContainer}>
        {isFormVisible && (
          <View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.emailContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            </View>
            

            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.passwordContainer}>
  <View style={styles.passwordInputContainer}>
    <TextInput
      style={styles.passwordInput}
      placeholder="Senha"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={(text) => setPassword(text)}
    />
    <TouchableOpacity onPress={togglePasswordVisibility}>
      <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="gray" />
    </TouchableOpacity>
  </View>
</View>

            <View style={styles.ButtonsContainer}>
              <TouchableOpacity style={styles.button} onPress={validateForm}>
                <Text style={styles.buttonText}>Acessar</Text>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity style={styles.button2} onPress={handlePress}>
                <Text style={styles.buttonText2}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  TopContainer: {
    flex: 0.6,
    backgroundColor: 'white',
  },
  BottomContainer: {
    flex: 0.4,
    backgroundColor: 'white',
  },
  image: {
    marginTop: '20%',
    width: '85%',
    height: '85%',
    alignSelf: 'center',
  },
 /* input: {
    marginBottom: 16,
    padding: 4,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#f7a7b4',
    width: '80%',
    alignSelf: 'center'
  },*/
  emailContainer:
  {
    marginBottom: 16,
    paddingVertical: 6,
    width:'85%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    paddingHorizontal: 10, // Espaço entre o ícone e o TextInput
    borderColor: '#f7a7b4',
  },
  /*passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    width:'85%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#f7a7b4',
  },*/
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    paddingVertical: 6,
    borderColor: '#f7a7b4',
    marginBottom: '5%',
    paddingHorizontal: 10, // Espaço entre o ícone e o TextInput
  },
  passwordInput: {
    flex: 1, // Ocupa o espaço restante no contêiner
  },
  errorText: {
    color: 'red',
    marginLeft: '5%'
  },
  button: {
    marginTop: '20%',
    backgroundColor: '#cd4465',
    borderRadius: 10,
    width: '95%',
    height: '20%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '35%',
  },
  buttonText: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button2: {
    bottom: '25%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#cd4465',
    width: '95%',
    height: '20%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#BB2649',
  },
  line: {
    height: 5,
    backgroundColor: 'gray',
    marginVertical: '1%',
    bottom: '30%',
    width: '70%',
    alignSelf: 'center'
  },
});
