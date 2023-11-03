import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Seta() {
  const navigation = useNavigation(); // Mova a declaração do hook para dentro do componente funcional

  const goBackToHomeScreen = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={goBackToHomeScreen} >
        <Image source={require('../../../assets/Arrow.png')} style={styles.container} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    height: 35,
    width: 40,
  },
});
