import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Card from "../Componentes/card";
export default function Meio() {
  return (
    <View>
      <Text style={styles.conteiner}>Art’s Fia Buffet  <Image source={require("../../../assets/maps.png")}></Image></Text>
      <Text style={styles.conteiner2}>Cardápios Disponível</Text>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20
  },
  conteiner2:{
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "500"
  }
});
