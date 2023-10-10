import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function Stars() {
  return (
    <View style={styles.conteiner}>
      <Image source={require("../../../assets/stars.png")}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginLeft: 15,
    marginTop: 20,
  },
});
