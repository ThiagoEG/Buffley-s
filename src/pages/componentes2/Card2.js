import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Communications from 'react-native-communications';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

  const fazerLigacao = (telefone) => {
  const numeroTelefone = telefone.replace(/\D/g, ''); // Remova caracteres não numéricos do número de telefone
  const url = `tel:${numeroTelefone}`;
  Linking.openURL(url);
};

const EmployeeCard = ({ nome, cargo, tipoFuncionario, telefone, imagem, salario, onDelete, idFuncionario }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.image} />
        ) : null}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.textContainerTop}>
          <Text style={styles.label}>{nome}</Text>
        </View>
        <View style={styles.textContainerBottom}>
          <Text style={styles.label2}>{tipoFuncionario}</Text>
          <Text style={styles.label2}>R$ {salario}</Text>
          <Text style={styles.label2}>Cargo: {cargo}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => fazerLigacao(telefone)} style={{alignItems:'center', justifyContent: 'center'}}> 
        <View style={styles.iconContainer}>
          <Icon name="phone" size={24} color="gray"/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => onDelete(idFuncionario)} styles={styles.IconButton}>
        <View style={styles.trashIconContainer}>
          <MaterialIcons
            name="delete"
            size={35}
            color="#d51a46"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginTop: 26,
    marginHorizontal: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    flexDirection: 'row',
    position: 'relative',
  },
  trashIconContainer: {
    position: 'absolute',
    top: -32.5,
    right: '90%',
    borderRadius: 24,
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  imageContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  textContainerTop: {
    flexDirection: 'column',
    marginTop: 5,
  },
  textContainerBottom: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'column',
    fontSize: 22,
  },
  label2: {
    marginRight: 8,
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60, 
    height: 60, 
    borderRadius: 4,
  },
  IconButton:{
    width: 40,
    height: 40,
  }
});

export default EmployeeCard;
