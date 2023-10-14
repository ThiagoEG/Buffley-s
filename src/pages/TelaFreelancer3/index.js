import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

export default function TelaFreelancer2() {

  return (
<ScrollView style={styles.container}>
    <View style={styles.header}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </View>
    <Text style={styles.SectionText}>Sobre a empresa</Text>
          <View style={styles.square}>
        <AntDesign name="plus" size={24} color="black" />
        <Text style={styles.squareText}>Adicione uma foto</Text>
      </View>
      <View style={styles.line}></View>

      <TouchableOpacity style={styles.button}>
      <LinearGradient
        colors={['#f7b2be', '#F27288']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Nome
        </Text>
      </LinearGradient>
    </TouchableOpacity>
      
    <TouchableOpacity style={styles.button}>
      <LinearGradient
        colors={['#f7b2be', '#F27288']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Instagram        </Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <LinearGradient
        colors={['#f7b2be', '#F27288']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 5,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Whattsapp        </Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonContinuar}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  SectionText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold', // Negrito adicionado aqui
    marginVertical: 16,
  },
  squareText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold', // Negrito adicionado aqui
    marginVertical: 16,
  },
  square: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10, // Para torná-lo um quadrado arredondado
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },

  line: {
    backgroundColor: 'lightgray',
    height: 3, // Altura da linha (ajuste conforme necessário)
    width: '80%',
    alignSelf:'center',
    marginTop:'8%'
  },

  button: {
    width: '80%',
    height: 43,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F27288'
  },

  buttonContinuar:
  {
    width: '80%',
    height: 43,
    alignSelf: 'center',
    backgroundColor: '#be3455',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },

});
