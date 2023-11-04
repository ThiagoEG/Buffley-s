import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import { auth, db} from "../../services/firebaseConfigurations/firebaseConfig"; // Certifique-se de importar suas configurações do Firebase e o Firestore.
import { registerUser } from '../../services/firebaseConfigurations/authUtils'; // Importe a função de registro


const LinearButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <LinearGradient
        colors={['#be3455', '#ffffff']}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 2 }}
      >
        <Text style={styles.buttonText}>{title}</Text>
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
    width: '80%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LinearButton;
