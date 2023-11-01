import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Communications from 'react-native-communications';

const fazerChamada = () => {
  const telefone = {telefone}
  Communications.phonecall(telefone, true);
};

const EmployeeCard = ({ nome, cargo, tipoFuncionario, telefone, imagemUrl }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Image source={{ uri: "https://www.arita.com.br/wp-content/uploads/2020/08/pessoa-expansiva-principais-caracteristicas-desta-personalidade.jpg" }} style={styles.employeeImage} />
      </View>
        
        <View style={styles.employeeInfo}>
          <Text style={styles.cardText}>Nome: {nome}</Text>
          <Text style={styles.cardText}>Cargo: {cargo}</Text>
          <Text style={styles.cardText}>Tipo de Funcionário: {tipoFuncionario}</Text>
        </View>

      <View style={styles.cardRight}>
        <TouchableOpacity onPress={fazerChamada}>
        <Feather name="phone" size={24} color="green" />
        <Text style={styles.telefoneText}>{telefone}</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5%'
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  employeeInfo: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'center'
  },
  telefoneText: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default EmployeeCard;
