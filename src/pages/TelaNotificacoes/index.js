import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Navbar from '../Componentes/Navbar';
import TopBar from '../Componentes/TopbarNotificacoes';
import Notification from '../Componentes/Notificacao';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('General');
  const [buffets, setBuffets] = useState([]);

  useEffect(() => {
    const buffetsRef = ref(db, 'buffets');
  
    const handleData = (snapshot) => {
      const buffetsData = snapshot.val();
      if (buffetsData) {
        const buffetsArray = Object.values(buffetsData);
  
        // Imprima o array de buffets para depuração
        console.log('Buffets Array:', buffetsArray);
  
        // Atualize o estado com as imagens do buffet
        setBuffets(buffetsArray);
      }
    };
  
    onValue(buffetsRef, handleData);
  
    // Retorne uma função de limpeza para desinscrever o callback quando o componente for desmontado
    return () => {
      // Certifique-se de desinscrever o callback quando o componente for desmontado para evitar vazamentos de memória
      off(buffetsRef, 'value', handleData);
    };
  }, []);
  

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <TopBar onChangeTab={handleTabChange} />
      <ScrollView>
        {selectedTab === 'Recommended' &&
          buffets.map((buffet, index) => (
            <Notification
              key={index}
              text={`Buffet novo: ${buffet.nome}`}
            >
              {/* Adiciona a imagem do buffet ao lado da mensagem */}
              {buffet.imagem && (
                <Image
                  source={{ uri: buffet.imagem }}
                  style={styles.userImage}
                />
              )}
            </Notification>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
