import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Seta from "../Componentes/Seta";

export default function Navbar({title}) {
  return (
    <View style={styles.conteiner}>
        <Text style={styles.texts}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    alignItems: "flex-start",
    justifyContent: "center" ,
    height: 65,
    backgroundColor: "white",
   // borderBottomEndRadius: 10,
   // borderBottomStartRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16,
    padding:15,
  },
  texts:{
    fontSize: 34,
    fontWeight: 'bold',
  }
});
