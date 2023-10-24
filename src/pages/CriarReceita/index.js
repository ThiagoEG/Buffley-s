import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, TextInput, ScrollView } from "react-native";
import Navbar from "../Componentes/Navbar";
import LinearBorder from "../Componentes/LinearBorder";
import LinearButton from "../Componentes/LinearButton";
import { Picker } from '@react-native-picker/picker';

export default function CriarReceita() {
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
                    />
                    <Text style={styles.subTitle}>Categoria</Text>
                    <View style={styles.containerPicker}>
                        <Picker style={styles.PickerInput}>
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
                    />
                    <Text style={styles.subTitle}>Número de Porções</Text>
                    <LinearBorder
                        icon="person"
                        placeholder="Número de Porções"
                    />
                    <Text style={styles.subTitle}>Tempo de Preparo</Text>
                    <LinearBorder
                        icon="timer"
                        placeholder="Tempo de Preparo (minutos)"
                    />
                    <Text style={styles.subTitle}>Preço Estimado</Text>
                    <LinearBorder
                        icon="payments"
                        placeholder="Preço Estimado"
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <LinearButton title="Criar Receita" style={styles.Button} />
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
