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
import { Picker } from '@react-native-picker/picker';

export default function Welcome() {
  const [nome, setNome] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState('');
  const [data, setData] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { state } = useUser();
  const userId = state.uid;
  const route = useRoute();
  const { BuffetNome, cardapioData } = route.params || {};

  const [carneItens, setCarneItens] = useState([]);
  const [guarnicaoItens, setGuarnicaoItens] = useState([]);
  const [saladaItens, setSaladaItens] = useState([]);
  const [bolosItens, setBolosItens] = useState([]);
  const [entradaItens, setEntradaItens] = useState([]);
  const [bebidaItens, setBebidaItens] = useState([]);
  console.log("teste", BuffetNome, cardapioData)
  const [novaQuantidadeUni, setNovaQuantidadeUni] = useState('');

  const handleCategoriaUniChange = (value) => {
    setNovaQuantidadeUni(value);
  };
  useEffect(() => {
    // Se cardapioData for fornecido, preencha automaticamente os campos
    if (cardapioData) {
      setNome(cardapioData.Nome || ''); // Substitua 'Nome' pelo campo correto do objeto cardapioData
      setQtdPessoas(cardapioData.QuantidadePessoas || ''); // Substitua 'QuantidadePessoas' pelo campo correto
      // ... Preencha outros campos conforme necessário
    }
  }, [cardapioData]);

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
            <TouchableOpacity onPress={() => handleRemoveItem(index, tipoPreferencia)}>
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

  const handleRemoveItem = (index, preferenceType) => {
    switch (preferenceType) {
      case 'Carnes':
        setCarneItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      case 'Guarnição':
        setGuarnicaoItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      case 'Salada':
        setSaladaItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      case 'Bolos':
        setBolosItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      case 'Entrada':
        setEntradaItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      case 'Bebida':
        setBebidaItens((prevItens) => {
          const newItens = [...prevItens];
          newItens.splice(index, 1);
          return newItens;
        });
        break;
      default:
        // Do nothing for unknown preference types
        break;
    }
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
    if (!nome || !qtdPessoas === novaQuantidadeUni) {
      setErrors({
        nome: !nome ? 'Campo obrigatório' : '',
        qtdPessoas: !qtdPessoas ? 'Campo obrigatório' : '',
      });
      return;
    }

    const clienteImagemRef = ref(db, `clientes/${userId}/imagem`);
    const clienteImagemSnapshot = await get(clienteImagemRef);
    const clienteImagemUrl = clienteImagemSnapshot.exists() ? clienteImagemSnapshot.val() : null;

    const dadosPreferencias = {
      nome,
      qtdPessoas: novaQuantidadeUni,
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
      clienteImagemUrl: clienteImagemUrl,
    };

    try {
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
      <Navbar />
      <View style={styles.containerForm}>
        <Text style={styles.sectionTitle}>Dados</Text>

        <LinearBorder
          icon="person"
          placeholder="Nome do Cardápio"
          value={nome} // Atualizado para exibir o valor do estado
          onChangeText={(text) => setNome(text)}
        />

        <View style={{ flexDirection: "row" }[styles.componets]}>
          <View style={styles.containerPicker}>
            <Picker
              style={styles.PickerInput}
              selectedValue={novaQuantidadeUni}
              onValueChange={handleCategoriaUniChange}>
              <Picker.Item label="Numero de Convidados" value="" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="80" value="80" />
              <Picker.Item label="100" value="150" />
              <Picker.Item label="150" value="150" />
              <Picker.Item label="200" value="200" />
              <Picker.Item label="250" value="250" />
            </Picker>
          </View>


         
        </View>
        <View style={{alignSelf: 'center', width: '100%'}}>
 <DatePickerComponent onSelectDate={(data) => setDataSelecionada(data)} style={styles.DatePicker} />
</View>
        <Text style={[styles.sectionTitle1]}>Preferências</Text>


        {mapPreferencias('Carnes', carneItens, setCarneItens, handleRemoveItem)}
        {mapPreferencias('Acompanhamentos', guarnicaoItens, setGuarnicaoItens, handleRemoveItem)}
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
  sectionTitle1: {
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
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 12,
  },
  bottomContainer: {
    flex: 1,
    padding: 10,
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
  componets: {
    width: '100%',
    flexDirection: "row"
  },
  DatePicker:
  {
  },

  AddBoton: {
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
  sectionTitle2: {
    fontSize: 22,
    marginLeft: 18,
    marginTop: 10,
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
    height: 50,
    alignSelf: 'center',
  },

  containerPicker: {
    width: '85%',
    marginTop: 10,
    borderRadius: 5,
    height: 45,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(255, 203, 210, 0.8)',
    alignSelf: "center",
  },
});
