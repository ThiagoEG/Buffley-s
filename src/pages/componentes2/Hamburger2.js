import React from "react";
import {TouchableOpacity, View, Button, Image, StyleSheet} from "react-native";

export default function Hamburger() {
  return (
    <View>
      <TouchableOpacity>
        <Image source={require('../../../assets/Hamburger.png')} style={styles.conteiner}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    marginLeft: 10,
    height: 35,
    width: 42,
  },
});
