import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TelaInicial() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Welcome');
  };
  const handlePress2 = () => {
    navigation.navigate('SignIn');
  };
/*onPress={()=>navigation.navigate('HomeScreen')}*/
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.text}>Buffley's</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress2}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.text1}>ou</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250
  },
  text: {
    fontSize: 32, 
    fontFamily: 'courgette-regular',
    color: '#be3455',
    marginBottom: 80,
  },
  button: {
    width: 333.52,
    height: 51.42,
    backgroundColor: '#be3455',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },

  text1:{
    fontSize: 16,
    marginBottom: 10
  }
});
