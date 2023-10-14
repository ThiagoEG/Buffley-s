import React from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";

export default function Imagem() {
  return (
    <View>
      <Image source={require("../../../assets/Rectangle-46.png")} style={styles.conteiner} />
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginTop: 25,
    height: 200,
    width: 370,
    alignSelf: "center",
    borderRadius: 10
  },
});
