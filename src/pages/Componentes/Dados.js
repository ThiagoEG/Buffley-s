import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Dados() {
  return (
    <View>
      <Text style={styles.conteiner}>Sobre a vaga:</Text>
      <Text style={styles.conteiner2}>Vaga: <Text style={styles.conteiner3}>Garçom</Text></Text>
      <Text style={styles.conteiner2}>Horario: <Text style={styles.conteiner3}>16 as 21 hrs</Text></Text>
      <Text style={styles.conteiner2}>Dia: <Text style={styles.conteiner3}>25/07/23</Text></Text>
      <Text style={styles.conteiner2}>Endereço: <Text style={styles.conteiner3}>Rua Norm 44, SP</Text></Text>
      <Text style={styles.conteiner2}>Salario: <Text style={styles.conteiner3}>80R$</Text></Text>
      <Text style={styles.conteiner4}>Contatos</Text>
      <View style={styles.conteiner5}>
      <Image style={styles.Image} source={require("../../../assets/instagram.png")}></Image>
      <Image style={styles.Image} source={require("../../../assets/Phone.png")}></Image>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginTop: 50,
    alignSelf: "flex-start",
    marginLeft: 50,
    fontSize: 35,
    fontWeight: "700"
  },
  conteiner2:{
    marginTop: 15,
    fontSize: 24,
    marginLeft: 70,
  },

  conteiner3:{
    color: "#E05772"
  },

  conteiner4:{
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight:"700",
    marginLeft: 50,
    marginTop: 35
  },

  conteiner5:{
    flexDirection: 'row', // Isso coloca os elementos lado a lado
    alignItems: 'center', // Isso alinha os elementos verticalmente no centro
    marginLeft: 50
  },

  Image:{
    marginRight: 10,
    height: 35,
    width: 35
  }
});
