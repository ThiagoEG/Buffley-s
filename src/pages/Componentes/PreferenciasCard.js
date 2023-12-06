import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import CustomModal from '../componentes2/Modal';
import { ref, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function PreferenciasCard({ nome, qtdsPessoas, data, preferenciasId, preferenciasCliente, clienteImagemUrl }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [preferenciasData, setPreferenciasData] = useState(null);
  const navigation = useNavigation();

  const handleDetalhes = async () => {
    try {
      const preferenciasRef = ref(db, `preferencias/${preferenciasId}`);
      const preferenciasSnapshot = await get(preferenciasRef);

      if (preferenciasSnapshot.exists()) {
        const preferenciasData = preferenciasSnapshot.val();
        // Navegue para a tela de detalhes passando os dados da preferência como parâmetro
        navigation.navigate('PreferenciasDetalhes', { preferenciasData, preferenciasId });
      } else {
        console.error('Preferencias data not found.');
      }
    } catch (error) {
      console.error('Error fetching preferencias details:', error);
    }
  };

  useEffect(() => {
    console.log('Cliente Imagem URL:', clienteImagemUrl);

    // Adicione um log para verificar se a URL está correta
    Image.getSize(clienteImagemUrl, (width, height) => {
      console.log('Imagem carregada com sucesso. Tamanho:', width, height);
    }, (error) => {
      console.error('Erro ao carregar a imagem:', error);
    });
  }, [clienteImagemUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.retangulo1}>
        <View style={styles.titleSol}>
          <Image source={{ uri: clienteImagemUrl }} style={styles.imagem} />
          <View style={styles.titleSol2}>
            <Text style={styles.title1}>{nome}</Text>
            <Text style={styles.title2}>Quantidade de pessoas: {qtdsPessoas}</Text>
            <Text style={styles.title2}>Data: {data}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDetalhes} style={{marginRight: 8,}}>
          <Image source={require('../../../assets/MenuDots.png')} style={styles.imagemIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  retangulo1: {
    width: '90%',
    height: 100,
    backgroundColor: 'white',
    marginTop: 14,
    marginHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowOffset: { width: 15, height: 10 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 12,
  },

  titleSol: {
    alignContent: 'center',
    flexDirection: 'row',
  },

  titleSol2: {
    alignContent: 'center',
    marginLeft: 10,
  },

  title1: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: '10%',
  },

  title2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#F27288',
  },

  imagemIcon: {
    resizeMode: 'contain',
    marginRight: 16,
  },

  imagem: {
    width: 70,
    height: 70,
    margin: '5%',
  },
});
