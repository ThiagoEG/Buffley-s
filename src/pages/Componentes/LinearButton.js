import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LinearButton = (title) => {

  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <LinearGradient
        colors={['#be3455', '#ffffff']} // Cores do gradiente
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 2 }}
      >
        <Text style={styles.buttonText}>Criar</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 0,
    bottom: 0,
  },
  button: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LinearButton;
