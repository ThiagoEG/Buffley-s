import React, { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../componentes2/NavbarFunc';
import Imagem from '../componentes2/Imagem2.js';
import Meio from '../componentes2/Meio2.js';
import Botão from '../componentes2/Botão2.js';
import Stars from '../componentes2/Stars2.js';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions, ActivityIndicator  } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import SideMenu from '../Componentes/SideMenu';
import { useUser  } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import Card from '../componentes2/Card2';
import { ref, push, onValue } from 'firebase/database'; // Importações específicas para o Realtime Database
import { db } from "../../services/firebaseConfigurations/firebaseConfig";


const { width, height } = Dimensions.get('window');

export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para rastrear o carregamento

  useEffect(() => {
    const employeeRef = ref(db, 'funcionarios');

    onValue(employeeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const employees = Object.values(data);

        // Você pode filtrar os funcionários aqui se necessário
        // const filteredEmployees = employees.filter(...);

        setEmployeeList(employees);
        setLoading(false); // Define o carregamento como concluído
      } else {
        setEmployeeList([]);
        setLoading(false); // Define o carregamento como concluído mesmo se não houver dados
      }
    });
  }, []);

  const renderEmployees = () => {
    if (loading) {
      return <View style={styles.carregamento}><Text>Carregando...</Text><ActivityIndicator size="large" color="#000" /></View>; // Mostra o indicador de carregamento
    }

    if (employeeList.length === 0) {
      return ( 
        <Text>Nenhum funcionário disponível</Text>
      );
    }

    return employeeList.map((employee, index) => (
      <Card
        key={index}
        nome={employee.nome}
        cargo={employee.cargo}
        tipoFuncionario={employee.tipoFuncionario}
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
<ScrollView >

    
{renderEmployees()}
    </ScrollView>

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
    }
});
