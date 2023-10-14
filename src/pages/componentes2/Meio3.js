import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import Card from "./Card2";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Meio() {
  return (
    <View>
      <Card />
      <Card />
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 35,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    marginLeft: 10,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 10,
  },
  container2: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: "500",
  },
});
