import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import Navbar from '../Componentes/Navbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

const PreferenciasDetalhes = ({ route }) => {
  const { preferenciasData } = route.params;
  const [preferenciasClienteData, setPreferenciasClienteData] = useState(null);

  useEffect(() => {
    // Se a estrutura de preferenciasCliente for diferente, ajuste aqui
    setPreferenciasClienteData(preferenciasData.preferenciasCliente);
  }, [preferenciasData]);

  return (
    <View style={{flex: 1,}}>

      <Navbar/>
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
                <Text    style={styles.dados2} >{preferenciasClienteData.carnes.join(', ')}</Text>
              </View>
            )}

            {preferenciasClienteData.guarnicao && preferenciasClienteData.guarnicao.length > 0 && (
              <View style={styles.ContainerDados2}>
                <Text style={styles.dados}>Guarnição: </Text>
                <Text    style={styles.dados2}>{preferenciasClienteData.guarnicao.join(', ')}</Text>
              </View>
            )}

            {preferenciasClienteData.salada && preferenciasClienteData.salada.length > 0 && (
              <View style={styles.ContainerDados2}>
                <Text style={styles.dados}>Salada: </Text>
                <Text   style={styles.dados2}>{preferenciasClienteData.salada.join(', ')}</Text>
              </View>
            )}

            {preferenciasClienteData.bolos && preferenciasClienteData.bolos.length > 0 && (
              <View style={styles.ContainerDados2}>
                <Text style={styles.dados}>Bolos: </Text>
                <Text   style={styles.dados2}>{preferenciasClienteData.bolos.join(', ')}</Text>
              </View>
            )}

            {preferenciasClienteData.entrada && preferenciasClienteData.entrada.length > 0 && (
              <View style={styles.ContainerDados2}>
                <Text style={styles.dados}>Entrada: </Text>
                <Text  style={styles.dados2}>{preferenciasClienteData.entrada.join(', ')}</Text>
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

        <View style={styles.containerBotoes}>
          
          <TouchableOpacity style={[styles.botao, { backgroundColor: '#ff6961' }]}>
            <MaterialIcons name="close" size={20} color="white" />
            <Text style={styles.textoBotao}>Recusar</Text>
          </TouchableOpacity>
          
          {/* Botão Aceitar */}
          <TouchableOpacity style={[styles.botao, { backgroundColor: '#098409e7' }]}>
            <MaterialIcons name="check" size={20} color="white" />
            <Text style={styles.textoBotao}>Aceitar</Text>
          </TouchableOpacity>

          {/* Botão Recusar */}
          
        </View>


    </View>
  );
};

export default PreferenciasDetalhes;

const styles = StyleSheet.create({

  titulo:{
    fontSize:32,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 12,
  },

  ContainerDados:{
    marginLeft: 26,
    fontSize: 22,
  },

  dados:{
    fontSize: 22,
    gap: 5,
    fontWeight: 'normal',
    marginTop:5,
    color: '#1b1a1a',
  },
  dados2:{
    fontSize: 18,
    color: '#484545',
  },
  containerBotoes: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 26,  // Adicionei um espaçamento superior para separar os botões do conteúdo acima
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
  textoBotao: {
    color: 'white',
  },
})