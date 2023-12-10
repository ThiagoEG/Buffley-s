import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../componentes2/NavbarFunc';
import Imagem from '../componentes2/Imagem2.js';
import Meio from '../componentes2/Meio2.js';
import Botão from '../componentes2/Botão2.js';
import Stars from '../componentes2/Stars2.js';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions, ActivityIndicator, Alert  } from 'react-native';
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import SideMenu from '../Componentes/SideMenu';
import { useUser  } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import Card from '../componentes2/Card2';
import { ref, get, remove, onValue } from 'firebase/database'; // Importações específicas para o Realtime Database
import { db } from "../../services/firebaseConfigurations/firebaseConfig";


const { width, height } = Dimensions.get('window');

export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const { state } = useUser();
  const [loading, setLoading] = useState(true); // Estado para rastrear o carregamento

  const handleDeleteEmployee = (idFuncionario) => {
    const funcionarioRef = ref(db, 'funcionarios');
  
    get(funcionarioRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let funcionarioKey = null;
  
          // Encontre a chave do funcionário com base no idFuncionario
          Object.keys(data).forEach((key) => {
            if (data[key].idFuncionario === idFuncionario) {
              funcionarioKey = key;
            }
          });
  
          if (funcionarioKey) {
            // Exclua o funcionário do banco de dados permanentemente
            remove(ref(db, `funcionarios/${funcionarioKey}`))
              .then(() => {
                console.log('Funcionário excluído permanentemente com sucesso.');
  
                // Atualize o estado para remover o funcionário excluído da lista
                setEmployeeList((prevEmployeeList) => {
                  return prevEmployeeList.filter((employee) => employee.idFuncionario !== idFuncionario);
                });

                Alert.alert('Funcionário excluído com sucesso');
              })
              .catch((error) => {
                console.error('Erro ao excluir o funcionário', error);
              });
          } else {
            console.log('Funcionário não encontrado.');
          }
        } else {
          console.log('Não existem funcionários no banco de dados.');
        }
      })
      .catch((error) => {
        console.error('Erro ao consultar o funcionário:', error);
      });
        <ActivityIndicator size="large" color="red"  />
  };
  const userId = state.uid
  console.log("Id do usuario:", userId)

  useEffect(() => {
    const employeeRef = ref(db, 'funcionarios');

    onValue(employeeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const employees = Object.values(data);

        // Você pode filtrar os funcionários aqui se necessário
        // const filteredEmployees = employees.filter(...);
        const filteredEmployees = employees.filter((employee) => employee.buffetUID  === userId);
        setEmployeeList(filteredEmployees);
        setLoading(false); // Define o carregamento como concluído
      } else {
        setEmployeeList([]);
        setLoading(false); // Define o carregamento como concluído mesmo se não houver dados
      }
    });
  }, []);

  const renderEmployees = () => {
    if (loading) {
      return (
        <View style={styles.carregamento}>
          <Text>Carregando...</Text>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ); // Mostra o indicador de carregamento
    }

    if (employeeList.length === 0) {
      return <TouchableOpacity onPress={handleCriarFuncionarioNavigation} >
              <View style={styles.cardAdd}>
                <Text style={styles.cardTitle}>Adicionar funcionario</Text>
                <Ionicons name="add-circle-outline" size={40} marginRight={12} color="black" />
              </View>
            </TouchableOpacity>
    }

    return employeeList.map((employee, index) => (
      <Card
        key={index}
        nome={employee.nome}
        cargo={employee.cargo}
        tipoFuncionario={employee.tipoFuncionario}
        imagem={employee.imagem}z
        salario={employee.salario}
        telefone={employee.telefone}
        onDelete={() => handleDeleteEmployee(employee.idFuncionario)}
      />
    ));
  };
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleNotifications = () => {
    navigation.navigate('TelaNotificacoes');
  };
  const handleCriarFuncionarioNavigation = () => {
    navigation.navigate('CriarFuncionario');
  };
  const handleBuffetNavigation = () => {
    navigation.navigate('BuffetPerfil');
  };
  return (
    <View style={styles.container}>

    <Navbar navigation={navigation} onMenuPress={toggleMenu}></Navbar>
    <SideMenu isVisible={menuVisible} onClose={toggleMenu} />

    <SideMenu  isVisible={menuVisible} onClose={toggleMenu}></SideMenu>

        
    {renderEmployees()}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,  // Use width e height para tornar o tamanho responsivo
    height: '100%',
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: height * 0.09,  // Defina uma porcentagem adequada
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,
    shadowOffset: { width: 10, height: 0 },
      shadowOpacity: 5,
      shadowRadius: 2,
      elevation: 8,
  },
    
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      marginRight: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    carregamento:
    {
      alignItems: 'center',
      marginTop: '15%'
    },

    cardAdd:{
      marginTop:12,
      marginHorizontal: 16,
      height: 150,
      backgroundColor: 'white',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      elevation: 8,
    },
    cardTitle:{
      fontSize: 26,
      fontWeight: "normal",
      marginRight: 8,
    }
});
