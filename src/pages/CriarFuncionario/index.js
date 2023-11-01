import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearBorder from '../Componentes/LinearBorder';
import Navbar from '../Componentes/Navbar';
import LinearButton from '../Componentes/LinearButton';
import { Picker } from '@react-native-picker/picker';
import { ref, push, get, serverTimestamp } from 'firebase/database'; // Importações específicas para o Realtime Database
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useAuth } from '../../services/AuthContext/index';
import { useUser } from '../../services/UserContext/index';
import { useNavigation } from '@react-navigation/native';

export default function AddCardapio() {
  const navigation = useNavigation();
  const { state: authState } = useAuth();
  const { state } = useUser();
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoFuncionario, setTipoFuncionario] = useState('Fixo');
  const [errorMessage, setErrorMessage] = useState('');
  const [uidDoBuffetConectado, setUidDoBuffetConectado] = useState(null);
  const [isUidChecked, setIsUidChecked] = useState(false);

  useEffect(() => {
    const userID = state.uid;
    if (userID) {
      // O usuário está autenticado, verifique o UID do buffet
      const userTypeRef = ref(db, `users/${userID}/`);
      get(userTypeRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userEmail = snapshot.val();
            console.log('UID do buffet:', userEmail);
            setUidDoBuffetConectado(userEmail);
          } else {
            setErrorMessage('O nó não existe no banco de dados.');
          }
        })
        .catch((error) => {
          console.error('Erro ao recuperar o UID do buffet:', error);
          setErrorMessage('Erro ao recuperar o UID do buffet.');
        })
        .finally(() => {
          setIsUidChecked(true);
        });
    }
  }, [state.uid]);

  const handleNomeChange = (text) => {
    setNome(text);
  };

  const handleCargoChange = (text) => {
    setCargo(text);
  };

  const handleSalarioChange = (text) => {
    setSalario(text);
  };

  const handleTelefoneChange = (text) => {
    setTelefone(text);
  };

  const handleTipoFuncionarioChange = (value) => {
    setTipoFuncionario(value);
  };

  const handleSubmit = () => {
    if (!isUidChecked) {
      setErrorMessage('A verificação do UID do buffet ainda não foi concluída.');
      return;
    }

    if (!uidDoBuffetConectado) {
      setErrorMessage('UID do buffet não encontrado. Certifique-se de estar conectado a um buffet.');
      return;
    }

    if (!nome || !cargo || !salario || !telefone) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    const funcionarioData = {
      nome,
      cargo,
      salario,
      telefone,
      tipoFuncionario,
      buffetUID: uidDoBuffetConectado,
      dataCadastro: serverTimestamp(), // Adicione a data de cadastro do funcionário
    };

    const funcionariosRef = ref(db, 'funcionarios');

    push(funcionariosRef, funcionarioData)
      .then(() => {
        console.log('Funcionário adicionado com sucesso ao Firebase Realtime Database.');
        setErrorMessage('');
        navigation.navigate('Funcionarios');
      })
      .catch((error) => {
        console.error('Erro ao adicionar funcionário:', error);
        setErrorMessage('Erro ao adicionar funcionário');
      });
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Cadastrar funcionário</Text>
      <View style={styles.formContainer}>
        <LinearBorder icon="person" placeholder="Nome do funcionário" onChangeText={handleNomeChange} />
        <LinearBorder icon="payment" placeholder="Salário" onChangeText={handleSalarioChange} />
        <LinearBorder icon="work" placeholder="Cargo" onChangeText={handleCargoChange} />
        <LinearBorder icon="phone" placeholder="Telefone" onChangeText={handleTelefoneChange} />
        <Text style={styles.subTitle}>Tipo de funcionário</Text>
        <View style={styles.containerPicker}>
          <Picker
            selectedValue={tipoFuncionario}
            onValueChange={handleTipoFuncionarioChange}
          >
            <Picker.Item label="Fixo" value="Fixo" />
            <Picker.Item label="FreeLancer" value="FreeLancer" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <LinearButton title="Criar Funcionário" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 26,
    marginLeft: 26,
  },
  formContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  containerPicker: {
    width: 340,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 5,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(255, 203, 210, 0.8)',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 26,
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 0,
    bottom: 0,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
