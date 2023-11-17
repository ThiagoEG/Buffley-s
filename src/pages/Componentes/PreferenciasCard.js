import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useNavigation } from '@react-navigation/native';

export default function PreferenciasCard({ nome, qtdsPessoas, data, preferenciasId, preferenciasCliente, userId }) {
  const [clienteImagemUrl, setClienteImagemUrl] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchClienteImagemUrl = async () => {
      try {
        const clienteImagemUrl = preferenciasCliente?.clienteImagemUrl;

        if (clienteImagemUrl) {
          setClienteImagemUrl(clienteImagemUrl);
          console.log('URL da imagem do cliente definida com sucesso');
        } else {
          console.error('Imagem do cliente não encontrada.');
        }
      } catch (error) {
        console.error('Erro ao buscar a imagem do cliente:', error);
      }
    };

    fetchClienteImagemUrl();
  }, [preferenciasCliente]);

  const handleDetalhes = async () => {
    try {
      const preferenciasRef = ref(db, `preferencias/${preferenciasId}`);
      const preferenciasSnapshot = await get(preferenciasRef);

      if (preferenciasSnapshot.exists()) {
        const preferenciasData = preferenciasSnapshot.val();
        // Navegue para a tela de detalhes passando os dados da preferência como parâmetro
        navigation.navigate('PreferenciasDetalhes', { preferenciasData });
      } else {
        console.error('Preferencias data not found.');
      }
    } catch (error) {
      console.error('Error fetching preferencias details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.retangulo1}>
        <View style={styles.titleSol}>
          <Image source={{ uri: clienteImagemUrl }} style={styles.imagem} />
          <View style={styles.titleSol2}>
            <Text style={styles.title1}>{nome}</Text>
            <Text style={styles.title2}>{qtdsPessoas}</Text>
            <Text style={styles.title2}>{data}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleDetalhes}>
          <Image source={require('../../../assets/MenuDots.png')} style={styles.imagemIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  retangulo1: {
    width: '85%',
    height: 75,
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
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
    fontSize: 24,
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
    margin: '5%',
  },
});
