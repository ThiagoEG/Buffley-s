import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ref, set, push, query, orderByChild, equalTo, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import Navbar from '../Componentes/Navbar';
import LinearBorder from '../Componentes/LinearBorder';
import { useUser } from '../../services/UserContext/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePickerComponent from '../Componentes/DatapickerPreferencias';
import { tiposDeCarnes, bebidas, bolos, entradas, saladas, guarnicoes } from '../../Banco/PreferenciasBanco';
import MultiSelectComponent from '../Componentes/DropDonwSelect';
import { MaterialIcons } from '@expo/vector-icons';

export default function Welcome() {
  const [nome, setNome] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState('');
  const [data, setData] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { state } = useUser();
  const userId = state.uid;
  const route = useRoute(); // Corrija o nome da variável aqui
  const { BuffetNome } = route.params || {};

  const [carneItens, setCarneItens] = useState([]);
  const [guarnicaoItens, setGuarnicaoItens] = useState([]);
  const [saladaItens, setSaladaItens] = useState([]);
  const [bolosItens, setBolosItens] = useState([]);
  const [entradaItens, setEntradaItens] = useState([]);
  const [bebidaItens, setBebidaItens] = useState([]);



  const [dataSelecionada, setDataSelecionada] = useState('');

  const mapPreferencias = (tipoPreferencia, itens, setItens, handleRemoveItem) => {
    return (
      <View>
        <Text style={styles.sectionTitle2}>{tipoPreferencia}</Text>
        {itens.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <LinearBorder
              placeholder={`${tipoPreferencia} ${index + 1}`}
              onChangeText={(text) => {
                const newItens = [...itens];
                newItens[index] = text;
                setItens(newItens);
              }}
            />
            <TouchableOpacity onPress={() => handleRemoveItem(index)}>
              <MaterialIcons name='delete' size={24} color={'red'} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={() => setItens([...itens, ''])} style={styles.AddBoton}>
          <Text style={{ color: '#BB2649', marginLeft: 25 }}>Adicionar {tipoPreferencia}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleRemoveItem = (index) => {
    setCarneItens((prevItens) => {
      const newItens = [...prevItens];
      newItens.splice(index, 1);
      return newItens;
    });
  };
  
  

  const getBuffetId = async (buffetNome) => {
    try {
      const buffetRef = ref(db, 'buffets');
      const buffetQuery = query(buffetRef, orderByChild('nome'), equalTo(buffetNome));
      const buffetSnapshot = await get(buffetQuery);

      if (buffetSnapshot.exists()) {
        return Object.keys(buffetSnapshot.val())[0];
      } else {
        console.error('Buffet não encontrado no banco de dados.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o buffet:', error);
      return null;
    }
  };


  const handleSubmitPreferencias = async () => {
    // Validando os campos obrigatórios
    if (!nome || !qtdPessoas) {
      setErrors({
        nome: !nome ? 'Campo obrigatório' : '',
        qtdPessoas: !qtdPessoas ? 'Campo obrigatório' : '',
      });
      return;
    }

    try {
      // Obtenha a URL da imagem do cliente
      const clienteImagemRef = ref(db, `clientes/${userId}/imagem`);
      const clienteImagemSnapshot = await get(clienteImagemRef);
      const clienteImagemUrl = clienteImagemSnapshot.exists() ? clienteImagemSnapshot.val() : null;

      const dadosPreferencias = {
        nome,
        qtdPessoas,
        data: dataSelecionada,
        userId: userId,
        buffetId: await getBuffetId(BuffetNome),
        preferenciasCliente: {
          carnes: carneItens,
          guarnicao: guarnicaoItens,
          salada: saladaItens,
          bolos: bolosItens,
          entrada: entradaItens,
          bebida: bebidaItens,
        },
        clienteImagemUrl: clienteImagemUrl, // Inclua a URL da imagem no objeto
      };

      const preferenciasRef = ref(db, 'preferencias');
      const novaReferenciaPreferencias = push(preferenciasRef);
      const novoIdPreferencias = novaReferenciaPreferencias.key;

      dadosPreferencias.id = novoIdPreferencias;

      // Salvando os dados usando 'set' em vez de 'update'
      set(novaReferenciaPreferencias, dadosPreferencias).then(() => {
        console.log('Preferências adicionadas com sucesso ao Firebase Realtime Database.');
        console.log('ID das novas preferências:', novoIdPreferencias);

        // Resetando os campos e exibindo mensagem de sucesso
        setNome('');
        setQtdPessoas('');
        setDataSelecionada('');
        setCarneItens([]);
        setGuarnicaoItens([]);
        setSaladaItens([]);
        setBolosItens([]);
        setEntradaItens([]);
        setBebidaItens([]);
        setErrors({});

        navigation.navigate('HomeScreen');

        Alert.alert('Sucesso', 'Preferências salvas com sucesso!');
      });
    } catch (error) {
      console.error('Erro ao adicionar preferências:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar as preferências. Por favor, tente novamente.');
    }
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

          <DatePickerComponent
          onSelectDate={(data) => setDataSelecionada(data)} // Corrija esta linha
          style={styles.DatePicker}
        />
        </View>

        
        <Text style={[styles.sectionTitle1]}>Preferências</Text>

        
        {mapPreferencias('Carnes', carneItens, setCarneItens, handleRemoveItem)}
        {mapPreferencias('Guarnição', guarnicaoItens, setGuarnicaoItens, handleRemoveItem)}
        {mapPreferencias('Salada', saladaItens, setSaladaItens, handleRemoveItem)}
        {mapPreferencias('Bolos', bolosItens, setBolosItens, handleRemoveItem)}
        {mapPreferencias('Entrada', entradaItens, setEntradaItens, handleRemoveItem)}
        {mapPreferencias('Bebida', bebidaItens, setBebidaItens, handleRemoveItem)}

      </View>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmitPreferencias}>
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
  },
  DatePicker:
  {
  },

  AddBoton:{
    height: 40,
    backgroundColor: '#fff',
    elevation: 2,
    marginHorizontal: 16,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 5,
    shadowColor: '#be3455',
    marginTop: 16,
  },
  sectionTitle2:{
    fontSize: 22,
    marginLeft: 18,
    marginTop: 10,
  },

  itemContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginTop: 12,
    height: 50,
  }
});
