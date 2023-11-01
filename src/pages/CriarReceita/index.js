import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, TextInput, ScrollView } from "react-native";
import Navbar from "../Componentes/Navbar";
import LinearBorder from "../Componentes/LinearBorder";
import LinearButton from "../Componentes/LinearButton";
import { Picker } from '@react-native-picker/picker';
import { ref, push } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";

export default function CriarReceita() {
    const [nomeReceita, setNomeReceita] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [tempoDePreparo, setTempoDePreparo] = useState('');
    const [numeroDePorcoes, setNumeroDePorcoes] = useState('');
    const [categoria, setCategoria] = useState('Entradas');
    const [precoEstimado, setPrecoEstimado] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNomeReceitaChange = (text) => {
        setNomeReceita(text);
    };

    const handleIngredientesChange = (text) => {
        setIngredientes(text);
    };

    const handleTempoDePreparoChange = (text) => {
        setTempoDePreparo(text);
    };

    const handleNumeroDePorcoesChange = (text) => {
        setNumeroDePorcoes(text);
    };

    const handleCategoriaChange = (value) => {
        setCategoria(value);
    };

    const handlePrecoEstimadoChange = (text) => {
        setPrecoEstimado(text);
    };

    const handleSubmit = () => {
      if (!nomeReceita || !ingredientes || !tempoDePreparo || !numeroDePorcoes || !precoEstimado) {
          setErrorMessage('Preencha todos os campos obrigatórios.');
          return;
      }
  
      const receitaData = {
          nomeReceita,
          ingredientes,
          tempoDePreparo,
          numeroDePorcoes,
          categoria,
          precoEstimado,
      };
  
      const receitasRef = ref(db, 'Receitas');
  
      const newRecipeRef = push(receitasRef);
      const newRecipeId = newRecipeRef.key; // ID exclusivo gerado
  
      // Adicione o ID exclusivo como um campo na receita
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
  };
  
  

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Navbar />
            <ScrollView>
                <View style={styles.containerForm}>
                    <Text style={styles.title}>Criar Receita</Text>
                    <LinearBorder
                        icon="person"
                        placeholder="Nome da receita"
                        onChangeText={handleNomeReceitaChange}
                    />
                    <Text style={styles.subTitle}>Categoria</Text>
                    <View style={styles.containerPicker}>
                        <Picker
                            style={styles.PickerInput}
                            selectedValue={categoria}
                            onValueChange={handleCategoriaChange}>
                            <Picker.Item label="Entradas" value="Entradas" />
                            <Picker.Item label="Acompanhamentos" value="Acompanhamentos" />
                            <Picker.Item label="Guarnições" value="Guarnições" />
                            <Picker.Item label="Pratos Principais" value="Pratos Principais" />
                            <Picker.Item label="Sobremesas" value="Sobremesas" />
                            <Picker.Item label="Bebidas" value="Bebidas" />
                            <Picker.Item label="Saladas" value="Saladas" />
                        </Picker>
                    </View>
                    <Text style={styles.subTitle}>Ingredientes</Text>
                    <LinearBorder
                        placeholder="Adicione os ingredientes linha a linha (Nome, Quantidade, Valor)"
                        multiline
                        onChangeText={handleIngredientesChange}
                    />
                    <Text style={styles.subTitle}>Número de Porções</Text>
                    <LinearBorder
                        icon="person"
                        placeholder="Número de Porções"
                        onChangeText={handleNumeroDePorcoesChange}
                    />
                    <Text style={styles.subTitle}>Tempo de Preparo</Text>
                    <LinearBorder
                        icon="timer"
                        placeholder="Tempo de Preparo (minutos)"
                        onChangeText={handleTempoDePreparoChange}
                    />
                    <Text style={styles.subTitle}>Preço Estimado</Text>
                    <LinearBorder
                        icon="payments"
                        placeholder="Preço Estimado"
                        onChangeText={handlePrecoEstimadoChange}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <LinearButton title="Criar Receita" style={styles.Button} onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
        color: 'black',
        marginLeft: 16,
    },
    containerForm: {
        flex: 1,
        alignSelf: 'center',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 16,
        marginTop: 16,
    },
    containerPicker: {
        width: 340,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 5,
        height: 45,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'rgba(255, 203, 210, 0.8)',
    },
    PickerInput: {
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    Button: {
        // Estilos para o botão
    }
});
