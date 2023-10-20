import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import Dropdown from "../Componentes/DropDown";
import DropCard from "../Componentes/DropCard";
import Navbar from "../Componentes/Navbar";

const { width, height } = Dimensions.get('window');

export default function Cardapio() {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputName}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginHorizontal: 16 }}>Nome</Text>
          <TextInput placeholder="Digite o nome do Cardápio" style={styles.Input} />
        </View>

        <View style={styles.inputs}>
          <View style={styles.inputData}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Convidados</Text>
            <Dropdown />
          </View>

          <View style={styles.inputDrop}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Data</Text>
            <Dropdown />
          </View>
        </View>

        <DropCard title="Entradas" />
        <DropCard title="Pratos principais" />
        <DropCard title="Acompanhamentos" />
        <DropCard title="Guarnições" />
        <DropCard title="Saladas" />
        <DropCard title="Sobremesas" />
        <DropCard title="Bebidas" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  scrollContent: {
    width: width,
    height: height,
    alignItems: "center",
  },

  Input: {
    width: 350,
    height: 50,
    elevation: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
    marginHorizontal: 16,
  },

  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    marginTop: 10,
    marginBottom: 24,
    paddingHorizontal: 16,
  },

  inputData: {
    flex: 1,
  },

  inputDrop: {
    flex: 1,
    marginLeft: 40,
  },
});
