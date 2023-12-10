import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue, off, remove, push, get, set } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import Navbar from '../Componentes/Navbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import LinearButton from '../Componentes/LinearButton';

const PreferenciasDetalhes = ({ route }) => {
  const { preferenciasData, preferenciasId } = route.params;
  const [preferenciasClienteData, setPreferenciasClienteData] = useState(null);
  const navigation = useNavigation();

  const handleCriarCardapio = () => {
    navigation.navigate('CriarCardapio', { preferenciasData, preferenciasId })
  }

  const handleRecusar = async () => {
    try {
      // Reference to the preference in the database
      const preferenceRef = ref(db, `preferencias/${preferenciasId}`);

      // Get the preference data
      const preferenceSnapshot = await get(preferenceRef);
      const preferenceData = preferenceSnapshot.val();

      // Remove the preference from the database
      

      // Create a new node "preferenciasRecusadas"
      const preferenciasRecusadasRef = ref(db, 'preferenciasRecusadas');
      const newRecusadaRef = push(preferenciasRecusadasRef);

      // Set the data for the new node
      await set(newRecusadaRef, {
        userId: preferenceData.userId,
        buffetId: preferenceData.buffetId,
        id: preferenceData.id,
      });
      await remove(preferenceRef);
      // Navega para uma tela diferente ou executa outras ações conforme necessário
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting preference:', error.message);
      // Lida com o erro conforme necessário
    }
  };

  useEffect(() => {
    // Se a estrutura de preferenciasCliente for diferente, ajuste aqui
    setPreferenciasClienteData(preferenciasData.preferenciasCliente);
  }, [preferenciasData]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
      <Navbar />
      <View style={styles.ContainerDadoss}>
      <View style={styles.ContainerDadoss}>
      <Text style={styles.titulo}>Dados do Cardápio</Text>

      <View style={styles.ContainerDados}>
        <Text style={styles.dados}>Nome: {preferenciasData.nome}</Text>
        <Text style={styles.dados}>Quantidade de Pessoas: {preferenciasData.qtdPessoas}</Text>
        <Text style={styles.dados}>Data: {preferenciasData.data}</Text>
      </View>

      <Text style={styles.titulo} >Preferências do Cliente:</Text>
      {preferenciasClienteData && (
        <View style={styles.ContainerDados} >


          {preferenciasClienteData.carnes && preferenciasClienteData.carnes.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Carnes: </Text>
              <Text style={styles.dados2} >{preferenciasClienteData.carnes.join(', ')}</Text>
            </View>
          )}

          {preferenciasClienteData.guarnicao && preferenciasClienteData.guarnicao.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Guarnição: </Text>
              <Text style={styles.dados2}>{preferenciasClienteData.guarnicao.join(', ')}</Text>
            </View>
          )}

          {preferenciasClienteData.salada && preferenciasClienteData.salada.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Salada: </Text>
              <Text style={styles.dados2}>{preferenciasClienteData.salada.join(', ')}</Text>
            </View>
          )}

          {preferenciasClienteData.bolos && preferenciasClienteData.bolos.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Bolos: </Text>
              <Text style={styles.dados2}>{preferenciasClienteData.bolos.join(', ')}</Text>
            </View>
          )}

          {preferenciasClienteData.entrada && preferenciasClienteData.entrada.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Entrada: </Text>
              <Text style={styles.dados2}>{preferenciasClienteData.entrada.join(', ')}</Text>
            </View>
          )}

          {preferenciasClienteData.bebida && preferenciasClienteData.bebida.length > 0 && (
            <View style={styles.ContainerDados2}>
              <Text style={styles.dados}>Bebida: </Text>
              <Text style={styles.dados2}>{preferenciasClienteData.bebida.join(', ')}</Text>
            </View>
          )}
        </View>
      )}
      </View>
</ScrollView>
      </View>
</ScrollView>

      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={[styles.botao, { borderColor: 'red', borderWidth: 1 }]}
        >
          <Text style={{ color: 'red' }} onPress={handleRecusar}>Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { borderColor: 'green', borderWidth: 1 }]}
          onPress={handleCriarCardapio}
        >
          <Text style={{ color: 'green' }} onPress={handleCriarCardapio}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, { borderColor: 'green', borderWidth: 1 }]}
          onPress={handleCriarCardapio}
        >
          <Text style={{ color: 'green' }} onPress={handleCriarCardapio}>Aceitar</Text>
        </TouchableOpacity>
      </View>

      

      

    </View>


  );
};

export default PreferenciasDetalhes;

const styles = StyleSheet.create({

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
  },

  ContainerDados: {
    marginLeft: 26,
    fontSize: 22,
  },

  dados: {
    fontSize: 22,
    gap: 5,
    fontWeight: 'bold',
    fontWeight: 'bold',
    marginTop: 5,
    color: '#1b1a1a',


  },
  dados2: {
    fontSize: 18,
    color: '#484545',
  },
  containerBotoes: {
    flexDirection: 'row',
    width: '95%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 12,
    padding: 12,
  },
  botao: {
    height: 45,
    width: 150,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,


  },
  botao2: {
    height: 45,
    width: 150,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#098409e7'
  },


  containers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%'
  },
  button: {
    borderWidth: 1,
    padding: 15,
    width: '45%',
  },

  buttons: {
    borderWidth: 1,
    padding: 15,
    width: '45%',
    color: 'green'
  },
  buttonText: {
    textAlign: 'center',
  },
  ContainerDados: {
    padding: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom:16,
},


  containers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    width: '100%'
  },
  button: {
    borderWidth: 1,
    padding: 15,
    width: '45%',
  },

  buttons: {
    borderWidth: 1,
    padding: 15,
    width: '45%',
    color: 'green'
  },
  buttonText: {
    textAlign: 'center',
  },
  ContainerDados: {
    padding: 16,
    elevation: 6,
    backgroundColor: 'white',
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom:16,
},
})