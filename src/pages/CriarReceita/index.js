import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, TextInput, ScrollView, FlatList, TouchableOpacity, Alert } from "react-native";
import Navbar from "../Componentes/Navbar";
import LinearBorder from "../Componentes/LinearBorder";
import LinearButton from "../Componentes/LinearButton";
import { Picker } from '@react-native-picker/picker';
import { ref, push, set } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from '../../services/UserContext/index';

export default function CriarReceita() {
    const [nome, setNome] = useState('');
    const [ingredientes, setIngredientes] = useState([]);
    const [tempoDePreparo, setTempoDePreparo] = useState('');
    const [porcao, setPorcao] = useState('');
    const [categoria, setCategoria] = useState('Entradas');
    const [errorMessage, setErrorMessage] = useState('');
    const [novoIngrediente, setNovoIngrediente] = useState('');
    const [novaQuantidade, setNovaQuantidade] = useState('');
    const [novaQuantidadeUni, setNovaQuantidadeUni] = useState('');
    const [novoValor, setNovoValor] = useState('');
    const [novaUnidade, setNovaUnidade] = useState('');
    const navigation = useNavigation();
    const { state } = useUser();
    const [refreshing, setRefreshing] = useState(false);
    const userId = state.uid;
    

    const adicionarIngrediente = () => {
      if (novoIngrediente && novaQuantidade && novoValor && novaQuantidadeUni) {
        setIngredientes([
          ...ingredientes,
          {
            nome: novoIngrediente,
            quantidade: {
              quantidade: novaQuantidade,
              unidadeDeMedida: novaQuantidadeUni,
            },
            valor: novoValor,
          },
        ]);
    
        setNovoIngrediente('');
        setNovaQuantidade('');
        setNovoValor('');
        setNovaQuantidadeUni('');
      } else {
        Alert.alert('Campos em branco', 'Preencha todos os campos do ingrediente antes de adicioná-lo.');
      }
    };
    
    
    
      const removerIngrediente = (index) => {
        const novosIngredientes = [...ingredientes];
        novosIngredientes.splice(index, 1);
        setIngredientes(novosIngredientes);
      };

      

    const handleNomeReceitaChange = (text) => {
        setNome(text);
    };

    const handleNovaUnidadeChange = (value) => {
      setNovaUnidade(value);
  };

    const handleIngredientesChange = (text) => {
        setIngredientes(text);
    };

    const handleTempoDePreparoChange = (text) => {
        setTempoDePreparo(text);
    };

    const handleNumeroDePorcoesChange = (text) => {
      setPorcao(text);
    };
    

    const handleCategoriaChange = (value) => {
        setCategoria(value);
    };

    const handleCategoriaUniChange = (value) => {
      setNovaQuantidadeUni(value);
  };

    const handleSubmit = () => {
        console.log('Tentando salvar a receita...');
        if (!nome || ingredientes.length === 0 || !tempoDePreparo || !porcao) {
          console.log('Campos obrigatórios não preenchidos.');
          setErrorMessage('Preencha todos os campos obrigatórios.');
          return;
        }
        
      
        const receitaData = {
          nome,
          ingredientes,
          tempoDePreparo,
          porcao:{
            quantidade:porcao,
            unidade:novaUnidade,
          },
          categoria,
          userId,
        };
      
        const receitasRef = ref(db, 'receitas');
      
        const newRecipeRef = push(receitasRef);
        const newRecipeId = newRecipeRef.key;
      
        receitaData.id = newRecipeId;
      
        set(newRecipeRef, receitaData)
          .then(() => {
            console.log('Receita adicionada com sucesso ao Firebase Realtime Database.');
            console.log('ID da nova receita:', newRecipeId);
            setErrorMessage('');
          })
          .catch((error) => {
            console.error('Erro ao adicionar receita:', error);
            setErrorMessage('Erro ao adicionar a receita');
          });
      
        setNome('');
        setPorcao('');
        setTempoDePreparo('');
        setCategoria('');
        setIngredientes([]);
        
        navigation.navigate('CriarCardapio', { receitaData, setRefreshing: () => setRefreshing(true) });
        
        Alert.alert("Sucesso", "Receita adicionada com sucesso!");
        console.log("receita nova", receitaData);
      };
  

    return (
        <View style={styles.container}>
      <StatusBar hidden={true} />
      <Navbar />
      <ScrollView>
        <View style={styles.containerForm}>
          <Text style={styles.title}>Adicionar Receita</Text>
          <LinearBorder
            icon="person"
            placeholder="Nome da Receita"
            value={nome}
            onChangeText={handleNomeReceitaChange}
          />
          
          <LinearBorder
            icon="timer"
            placeholder="Tempo de Preparo (minutos)"
            keyboardType="numeric"
            value={tempoDePreparo}
            onChangeText={handleTempoDePreparoChange}
          />

          <Text style={styles.subTitle}>Porção</Text>

          <LinearBorder
            icon="kitchen"
            placeholder="Número de Porções"
            keyboardType="numeric"
            value={porcao}
            onChangeText={handleNumeroDePorcoesChange}
          />
          <View style={styles.containerPicker}>
                        <Picker
                            style={styles.PickerInput}
                            selectedValue={novaUnidade}
                            onValueChange={handleNovaUnidadeChange}>
                            <Picker.Item label="porção" value="porção" />
                        </Picker>
                    </View>
          

          <Text style={styles.subTitle}>Categoria</Text>
          <View style={styles.containerPicker}>
                        <Picker
                            style={styles.PickerInput}
                            selectedValue={categoria}
                            onValueChange={handleCategoriaChange}>
                            <Picker.Item label="Entradas" value="Entradas" />
                            <Picker.Item label="Acompanhamentos" value="Acompanhamentos" />
                            <Picker.Item label="Prato Principal" value="Pratos Principais" />
                            <Picker.Item label="Sobremesas" value="Sobremesas" />
                            <Picker.Item label="Bebidas" value="Bebidas" />
                            <Picker.Item label="Saladas" value="Saladas" />
                        </Picker>
                    </View>

          <Text style={styles.subTitle}>Ingredientes</Text>
          <FlatList
            data={ingredientes}
            renderItem={({ item, index }) => (
              <View style={styles.ingredientRow}>
                <Text style={styles.ingredientText}>
                  {item.nome}: R${item.valor} ({item.quantidade.quantidade}  {item.quantidade.unidadeDeMedida})
                </Text>
                <TouchableOpacity onPress={() => removerIngrediente(index)}>
                  <MaterialIcons name="delete" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.ingredientesList}
          />
          <LinearBorder
            placeholder="Nome do Ingrediente"
            value={novoIngrediente}
            onChangeText={setNovoIngrediente}
          />
          <LinearBorder
            placeholder="Valor do Ingrediente"
            keyboardType="numeric"
            value={novoValor}
            onChangeText={setNovoValor}
          />
          <Text style={styles.subTitle} >Quantidade</Text>
          <LinearBorder
            placeholder="Quantidade"
            value={novaQuantidade}
            onChangeText={setNovaQuantidade}
            keyboardType="numeric"
          />
          <View style={styles.containerPicker}>
                        <Picker
                            style={styles.PickerInput}
                            selectedValue={novaQuantidadeUni}
                            onValueChange={handleCategoriaUniChange}>
                            <Picker.Item label="Selecionar Medida" value="" />
                            <Picker.Item label="Gramas" value="g" />
                            <Picker.Item label="Kilo" value="kg" />
                            <Picker.Item label="Unidade" value="u" />
                            <Picker.Item label="Colher de cha" value="Colher de cha" />
                        </Picker>
                    </View>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={adicionarIngrediente}
          >
            <LinearGradient
              colors={["#d1921c", "#ffffff"]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}
            >
              <Text style={styles.buttonText}>Adicionar Ingrediente</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.buttonContainer]}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#be3455", "#ffffff"]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 2, y: 2 }}
            >
              <Text style={styles.buttonText}>Salvar Receita</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
      },
      containerForm: {
        flex: 1,
        marginBottom: 20,
      },
      title: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 16,
        color: "black",
        marginLeft: 16,
      },
      subTitle: {
        fontSize: 20,
        fontWeight: "300",
        marginLeft: 16,
        marginTop: 16,
      },
      ingredientesList: {
        marginTop: 12,
        marginBottom: 12,
        elevation: 2,
        backgroundColor: 'white',
        width: '90%',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 5,
      },
      ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      },
      ingredientText: {
        fontSize: 16,
      },
      buttonContainer: {
        marginTop: 10,
        width: "90%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        alignSelf: "center",
      },
      button: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
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

      tamanho:{
        width: '85%'
      }
});
