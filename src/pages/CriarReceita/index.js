import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, TextInput, ScrollView } from "react-native";
import Navbar from "../Componentes/Navbar";
import LinearBorder from "../Componentes/LinearBorder";
import LinearButton from "../Componentes/LinearButton";
import { Picker } from '@react-native-picker/picker';
import Acompanhamentos from '../ReceitasBanco/Acompanhamentos';
import Bebidas from '../ReceitasBanco/Bebidas';
import Entradas from '../ReceitasBanco/Entradas';
import Guarnicoes from '../ReceitasBanco/Guarnicoes';
import PratosPrincipais from '../ReceitasBanco/PratosPrincipais';
import Saladas from '../ReceitasBanco/Saladas';
import Sobremesas from '../ReceitasBanco/Sobremesas';

export default function CriarReceita({ navigation }) {
    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState("Entradas");
    const [ingredients, setIngredients] = useState("");
    const [servings, setServings] = useState("");
    const [preparationTime, setPreparationTime] = useState("");
    const [price, setPrice] = useState("");

    const adicionarReceitaAoBanco = (receita) => {
        switch (category) {
            case 'Entradas':
                Entradas.push(receita);
                break;
            case 'Acompanhamentos':
                Acompanhamentos.push(receita);
                break;
            // Adicione mais casos para outras categorias, se aplicável
            default:
                break;
        }
    };

    const handleCreateRecipe = () => {
        // Crie um objeto de receita com os dados fornecidos
        const novaReceita = {
            id: Date.now(), // Você pode gerar um ID único, por exemplo, com a data atual
            nome: recipeName,
            porcao: servings,
            tempoPreparo: preparationTime,
            categoria: category,
            ingredientes: ingredients.split('\n').map((line) => {
                const [nome, quantidade, valor] = line.split(', ');
                return { nome, quantidade, valor: parseFloat(valor) };
            }),
        };

        // Adicione a receita ao banco de dados correspondente
        adicionarReceitaAoBanco(novaReceita);

        // Após a criação bem-sucedida, você pode redirecionar o usuário para a tela de detalhes da receita ou outra tela apropriada.
        navigation.navigate('DetalhesReceita', { recipe: novaReceita });
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
                        value={recipeName}
                        onChangeText={(text) => setRecipeName(text)}
                    />
                    <Text style={styles.subTitle}>Categoria</Text>
                    <View style={styles.containerPicker}>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                        >
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
                        value={ingredients}
                        onChangeText={(text) => setIngredients(text)}
                        multiline
                    />
                    <Text style={styles.subTitle}>Número de Porções</Text>
                    <LinearBorder
                        icon="person"
                        placeholder="Número de Porções"
                        value={servings}
                        onChangeText={(text) => setServings(text)}
                    />
                    <Text style={styles.subTitle}>Tempo de Preparo</Text>
                    <LinearBorder
                        icon="timer"
                        placeholder="Tempo de Preparo (minutos)"
                        value={preparationTime}
                        onChangeText={(text) => setPreparationTime(text)}
                    />
                    <Text style={styles.subTitle}>Preço Estimado</Text>
                    <LinearBorder
                        icon="payments"
                        placeholder="Preço Estimado"
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                    />
                    <LinearButton title="Criar Receita" onPress={handleCreateRecipe} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        bottom: 0,
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
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 16,
        marginTop: 16,
    },
    containerPicker: {
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 10,
        height: 45,
        backgroundColor: 'white',
        elevation: 5,
        borderWidth: 6,
        borderColor: 'rgba(255, 203, 210, 0.8)',
    },
});
