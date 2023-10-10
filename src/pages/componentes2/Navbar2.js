import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Seta from "./Seta2";
import Hamburger from "./Hamburger2";
import Notificacao from "./Notificacao2";
import Component from "./Component2";

 function Navbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>Nome</Text>
      <View style={styles.rightContainer}>
        <Component style={styles.icons}/>
        <Notificacao style={styles.icons}/>
        <Hamburger style={styles.icons}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 65,
    backgroundColor: "white",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
  },
  leftText: {
    fontSize: 36,
    fontWeight: "500",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  
  }
});

export default Navbar;