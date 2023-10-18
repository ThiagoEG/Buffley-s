import React from "react";
import { Image, StyleSheet, View, TouchableOpacity} from "react-native";

export default function Botão() {
  return (
    <View>
        <TouchableOpacity>
        <Image source={require("../../../assets/Frame4.png")} style={styles.conteiner2}/>
        </TouchableOpacity>
       </View>
  );
}

const styles = StyleSheet.create({
    conteiner2:{
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10
    }
  },
);


/*
import React from "react";
import { Image, StyleSheet, View, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Botão() {
  const navigation = useNavigation(); // Mova a declaração do hook para dentro do componente funcional

  const handlePress = () => {
    navigation.navigate('Preferencias');
  };
  return (
    <View>
        <TouchableOpacity onPress={handlePress}>
        <Image source={require("../../../assets/Frame4.png")} style={styles.conteiner2}/>
        </TouchableOpacity>
       </View>
  );
}

const styles = StyleSheet.create({
    conteiner2:{
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 10
    }
  },
);

*/ 