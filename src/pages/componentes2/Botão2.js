import React from "react";
import { Image, StyleSheet, View, TouchableOpacity} from "react-native";

export default function Botão() {
  return (
    <View>
        <TouchableOpacity>
        <Image source={require("../../../assets/Frame3.png")} style={styles.conteiner2}/>
        </TouchableOpacity>
       </View>
  );
}

const styles = StyleSheet.create({
    conteiner2:{
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 12,
    }
  },
);
