import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Seta from "../Componentes/Seta";

export default function Navbar() {
  return (
    <View style={styles.conteiner}>
        <Seta/>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    alignItems: "flex-start",
    justifyContent: "center" ,
    height: 65,
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
});
