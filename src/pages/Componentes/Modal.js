import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import React, { useState, useEffect, useRef } from 'react';

export default function CustomModal({ isVisible, onClose }) {
  const modalizeRef = useRef(null);

  useEffect(() => {
    // Abre o modal quando a variável isVisible for true
    if (isVisible) {
      modalizeRef.current?.open();
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Modalize
        ref={modalizeRef}
        snapPoint={500}
        modalHeight={600}
        onClose={onClose} // Chama a função onClose quando o modal é fechado
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Preferências</Text>

          <View style={{
            marginTop: 16,
            marginHorizontal: 46,
          }}>

            <Text style={{ fontSize: 24, fontWeight: '500' }}>Carnes</Text>
            <View style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
              <Text style={{ fontSize: 16, fontWeight: '300' }}>Cupim</Text>
              <Text> </Text>
              <Text style={{ fontSize: 16, fontWeight: '300' }}>Frango</Text>
            </View>

          </View>
        </View>

        <View style={styles.createButtonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={onClose}>
            <Text style={styles.createButtonText}>Fechar</Text>
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
    top: '100%',
    zIndex: 1,
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
  createButtonContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  createButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#be3455',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontSize: 20,
    color: 'white',
  },
});
