import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearBorder from '../Componentes/LinearBorder';
import Navbar from '../Componentes/Navbar';
import LinearButton from '../Componentes/LinearButton';
import { Picker } from '@react-native-picker/picker';
import { ref, push, set, get, onValue } from 'firebase/database'; // Importações específicas para o Realtime Database
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useAuth } from '../../services/AuthContext/index';
import { useUser } from '../../services/UserContext/index';
import { useNavigation } from '@react-navigation/native';
import ImagePickerExample from '../Componentes/ImagePicker';
import { StatusBar } from 'expo-status-bar';
import { v4 as uuidv4 } from 'uuid'; // Importe a função v4 da biblioteca uuid

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
 // const [uidDoBuffetConectado, setUidDoBuffetConectado] = useState(null);
 // const [isUidChecked, setIsUidChecked] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const userID = state.uid;
  // Adicione um estado para rastrear a lista de funcionários
  const [employeeList, setEmployeeList] = useState([]);


  // Adicione uma função para atualizar a lista de funcionários
  const updateEmployeeList = () => {
    const employeeRef = ref(db, 'funcionarios');

    onValue(employeeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const employees = Object.values(data);
        const filteredEmployees = employees.filter((employee) => employee.buffetUID === userID);
        setEmployeeList(filteredEmployees);
      } else {
        setEmployeeList([]);
      }
    });
  };

  useEffect(() => {
    updateEmployeeList(); // Atualize a lista de funcionários quando o componente for montado
  }, [userID]);

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

  const handleImagemChange = (imageUri) => {
    setImageUri(imageUri);
  };

  const handleSubmit = () => {
    if (!userID) {
      setErrorMessage('A verificação do UID do buffet ainda não foi concluída.');
      return;
    }

    if (!nome || !cargo || !salario || !telefone) {
      setErrorMessage('Preencha todos os campos obrigatórios.');
      return;
    }

    // Gere um ID único para o funcionário usando a função uuidv4()
    const idFuncionario = uuidv4();
    const dataCadastro = new Date().toISOString();
    // Restante do código para criar o objeto funcionário
    const funcionarioData = {
      idFuncionario, // Adicione o ID gerado ao objeto do funcionário
      nome,
      cargo,
      salario,
      telefone,
      tipoFuncionario,
      buffetUID: userID,
      dataCadastro: dataCadastro,
      imagem: imageUri,
    };
  
    const funcionariosRef = ref(db, 'funcionarios');
  
    // Gere um ID exclusivo para o funcionário
    const novoFuncionarioRef = push(funcionariosRef);
  
    // Obtenha o ID gerado
    const funcionarioID = novoFuncionarioRef.key;
  
    // Defina os dados do funcionário no ID gerado
    set(novoFuncionarioRef, funcionarioData)
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
      <StatusBar hidden={true} />
      <Navbar />
      <ScrollView>
        <View style={styles.containerForm}>
          <Text style={styles.title}>Cadastrar funcionário</Text>
          <LinearBorder
            icon="person"
            placeholder="Nome do funcionário"
            value={nome}
            onChangeText={handleNomeChange}
          />
          <LinearBorder
            icon="work"
            placeholder="Cargo"
            value={cargo}
            onChangeText={handleCargoChange}
          />
          <LinearBorder
            icon="call"
            placeholder="Telefone"
            keyboardType="numeric"
            value={telefone}
            onChangeText={handleTelefoneChange}
          />
          <Text style={styles.subTitle}>Tipo funcionário</Text>
          <View style={styles.containerPicker}>
            <Picker
              selectedValue={tipoFuncionario}
              onValueChange={handleTipoFuncionarioChange}
            >
              <Picker.Item label="Fixo" value="Fixo" />
              <Picker.Item label="FreeLancer" value="FreeLancer" />
            </Picker>
          </View>
          <LinearBorder
            icon="payment"
            placeholder="Salário"
            keyboardType="numeric"
            value={salario}
            onChangeText={handleSalarioChange}
          />

          <ImagePickerExample setImageUri={setImageUri} onChangeText={handleImagemChange} />

          <View style={styles.buttonContainer}>
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <LinearButton title="Criar Funcionário" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForm: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'black',
    marginLeft: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 16,
    marginTop: 16,
  },
  containerPicker: {
    width: 340,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    borderWidth: 3,
    borderColor: 'rgba(255, 203, 210, 0.8)',
    alignSelf: 'center',
    textAlign: 'center',
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
