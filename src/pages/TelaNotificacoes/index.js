import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import Navbar from '../Componentes/Navbar';
import TopBar from '../Componentes/TopbarNotificacoes';
import Notification from '../Componentes/Notificacao';
import { db } from '../../services/firebaseConfigurations/firebaseConfig';
import { useUser } from '../../services/UserContext';
import { ref, onValue, off } from 'firebase/database';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('General');
  const [buffets, setBuffets] = useState([]);
  const [cardapios, setCardapios] = useState([]);
  const [preferenciasRecusadas, setPreferenciasRecusadas] = useState([]);
  const { state } = useUser();
  const userID = state.uid;

  useEffect(() => {
    const cardapiosRef = ref(db, 'cardapios');
    const buffetsRef = ref(db, 'buffets');
    const preferenciasRef = ref(db, 'preferenciasRecusadas');

    const handleCardapiosData = (snapshot) => {
      const cardapiosData = snapshot.val();
      if (cardapiosData) {
        const cardapiosArray = Object.values(cardapiosData);
        setCardapios(cardapiosArray);
      }
    };

    const handleBuffetsData = (snapshot) => {
      const buffetsData = snapshot.val();
      if (buffetsData) {
        const buffetsArray = Object.values(buffetsData);
        setBuffets(buffetsArray);
      }
    };

    const handlePreferenciasData = (snapshot) => {
      const preferenciasData = snapshot.val();
      if (preferenciasData) {
        const preferenciasArray = Object.values(preferenciasData);
        setPreferenciasRecusadas(preferenciasArray);
      }
    };

    onValue(cardapiosRef, handleCardapiosData);
    onValue(buffetsRef, handleBuffetsData);
    onValue(preferenciasRef, handlePreferenciasData);

    return () => {
      off(cardapiosRef, 'value', handleCardapiosData);
      off(buffetsRef, 'value', handleBuffetsData);
      off(preferenciasRef, 'value', handlePreferenciasData);
    };
  }, []);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const getBuffetNameById = (buffetId) => {
    const buffet = buffets.find((b) => b.id === buffetId);
    return buffet ? buffet.nome : 'Buffet não encontrado';
  }
  
  
  

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

{selectedTab === 'General' &&
          cardapios
            .filter((cardapio) => cardapio.userCardapioId === userID)
            .map((filteredCardapio, index) => (
              <Notification
                key={index}
                text={`Seu cardapio "${filteredCardapio.nomeCardapio}" foi retornado!`}
              >
                {filteredCardapio.imagem && (
                  <Image
                    source={{ uri: filteredCardapio.imagem }}
                    style={styles.userImage}
                  />
                )}
              </Notification>
            ))}
 {selectedTab === 'General' &&
          preferenciasRecusadas
            .filter((preferencia) => preferencia.userId === userID)
            .map((filteredPreferencia, index) => {
              const buffetName = buffets.length > 0
                ? getBuffetNameById(filteredPreferencia.buffetId)
                : 'Buffet não encontrado';

              return (
                <Notification
                  key={index}
                  text={`Sua preferência foi recusada!`}
                >
                  {/* Adicione qualquer informação adicional que deseja exibir */}
                </Notification>
              );
            })}

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
