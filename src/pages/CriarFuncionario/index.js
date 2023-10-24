import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import LinearBorder from "../Componentes/LinearBorder";
import Navbar from "../Componentes/Navbar";
import LinearButton from "../Componentes/LinearButton";
import { Picker } from '@react-native-picker/picker';

export default function AddCardapio() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Cadastrar funcionario</Text>

      <View style={styles.formContainer}>
        <LinearBorder icon="person" placeholder="Nome do funcionario" />
        <LinearBorder icon="payment" placeholder="Salario" />
        <LinearBorder icon="work" placeholder="Cargo" />
        <Text style={styles.subTitle}>Tipo funcionario</Text>
        <View style={styles.containerPicker}>
          <Picker style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Picker.Item label="Fixo" value="Entradas" />
            <Picker.Item label="FreeLancer" value="Acompanhamentos" />
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LinearButton title="Criar Receita" style={styles.button} />
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
    marginTop: 26,
    marginLeft: 26,
  },
  formContainer: {
    flex: 1, // Preenche o espaço disponível verticalmente
    alignSelf: 'center'
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
  },
  button: {
    // Estilos para o botão
  },
});
