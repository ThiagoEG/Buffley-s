/*
import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const Modal1 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clique no botão para abrir o modal.</Text>
      <Button title="Abrir Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Este é o conteúdo do modal.</Text>
            <Button title="Fechar Modal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Modal1;
*/

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useRef } from 'react';

export default function App() {
  const modalizeRef = useRef(null);

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onOpen}>
        <Text style={{ fontSize: 24 }}>Abrir modal</Text>
      </TouchableOpacity>

      <Modalize
        ref={modalizeRef}
        snapPoint={500}
        modalHeight={600}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Preferencias</Text>

          <View style={{
              marginTop: 16,
              marginHorizontal: 46,
            }}>

              <Text style={{fontSize: 24, fontWeigth: 500 }}>Carnes</Text>
              <View style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
                <Text style={{fontSize: 16, fontWeigth: 300 }}>Cupim</Text>
                <Text> </Text>
                <Text style={{fontSize: 16, fontWeigth: 300 }}>Frango</Text>
              </View>
          
            </View>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Criar</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    marginTop: 30,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 46,
    marginTop: 30,
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#be3455',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    
    modalContent:{
      marginTop: 130,
    },
    

  },
  createButtonText: {
    fontSize: 20,
    color: 'white',
  },
});


// Código de outras telas conectadas ao modal:

/*

preferencias(Lucas)

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useRef } from 'react';




const Preferencias = () =>{

    const modalizeRef = useRef(null);

    function onOpen(){
    modalizeRef.current?.open();
    }


  return (
    <View style={styles.container}>

      <Modalize
      ref={modalizeRef}
      snapPoint={500}
      modalHeight={600}
      HeaderComponent={
        <View style={{width: '100%', height: 50, backgroundColor: '#be3455', alignItems:'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 24}}> Preferencias</Text>
        </View>
      }
      
      >
        <View style={{
          flex: 1,
          height: 180,
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
          
        <TouchableOpacity style={[styles.botao, {backgroundColor:'#29ae19'}]}>
            <Text>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, {backgroundColor:'#FF0000'}]}>
            <Text>Salvar</Text>
        </TouchableOpacity>

        </View>

      </Modalize>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao:{
    alignItems:'center',
    justifyContent:"center",
    padding: 15,
    borderRadius:8,
    marginTop: 50,
  },
});

export default Preferencias;

modal(lucas)

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useRef } from 'react';




export default function Modals() {

  const modalizeRef = useRef(null);

function onOpen(){
  modalizeRef.current?.open();
}


  return (
    <View style={styles.container}>

      <Modalize
      ref={modalizeRef}
      snapPoint={500}
      modalHeight={600}
      HeaderComponent={
        <View style={{width: '100%', height: 50, backgroundColor: '#be3455', alignItems:'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 24}}> Preferencias</Text>
        </View>
      }
      
      >
        <View style={{
          flex: 1,
          height: 180,
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
          
        <TouchableOpacity style={[styles.botao, {backgroundColor:'#29ae19'}]}>
            <Text>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, {backgroundColor:'#FF0000'}]}>
            <Text>Salvar</Text>
        </TouchableOpacity>

        </View>

      </Modalize>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botao:{
    alignItems:'center',
    justifyContent:"center",
    padding: 15,
    borderRadius:8,
    marginTop: 50,
  },
});


*/ 