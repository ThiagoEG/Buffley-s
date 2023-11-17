// Componente CustomModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export default function CustomModal({ isVisible, onClose, preferencias }) {
  return (
    <Modal isVisible={isVisible} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Preferências do Cliente</Text>

        {/* Verifica se há preferências antes de exibi-las */}
        {preferencias && (
          <View style={styles.preferenciasContainer}>
            <Text style={styles.preferenciasLabel}>Preferências:</Text>

            {Object.keys(preferencias.preferenciasCliente).map((tipoPreferencia) => (
              <Text key={tipoPreferencia} style={styles.preferenciasLabel}>
                - {tipoPreferencia.charAt(0).toUpperCase() + tipoPreferencia.slice(1)}: {preferencias.preferenciasCliente[tipoPreferencia].join(', ')}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preferenciasContainer: {
    marginTop: 10,
  },
  preferenciasLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#be3455',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
