/*import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Platform, ScrollView, Dimensions  } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Certifique-se de instalar o pacote 'expo-vector-icons' ou outro similar
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Navbar from '../Componentes/Navbar';

const { width, height } = Dimensions.get('window');

export default function TelaNotificacoes() 
{
    <View style={styles.container}>
        <Navbar></Navbar>

    </View>
}

const styles = StyleSheet.create({
    container: {
flex:1,
backgroundColor: 'white'
    },
  });*/

  import { StatusBar } from 'expo-status-bar';
  import React, { useState } from 'react';
  import { StyleSheet, Text, View, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
  import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
  import Navbar from '../Componentes/Navbar';
  import TopBar from '../Componentes/TopbarNotificacoes';
  import Notification from '../Componentes/Notificacao';
  
  const { width, height } = Dimensions.get('window');
  
  export default function App() {
    const [selectedTab, setSelectedTab] = useState('General');
  
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };
  
    const notifications = [
      {
        userImage: 'https://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg',
        text: 'Você tem uma nova mensagem.',
        type: 'General', // Tipo da notificação
      },
      {
        userImage: 'https://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg',
        text: 'Nova postagem recomendada para você.',
        type: 'Recommended', // Tipo da notificação
      },
      // Adicione mais notificações conforme necessário
    ];
  
    return (
      <View style={styles.container}>
        <Navbar />
        <TopBar onChangeTab={handleTabChange} />
        <ScrollView>
          {notifications.map((notification, index) => (
            selectedTab === notification.type && (
              <Notification
                key={index}
                userImage={notification.userImage}
                text={notification.text}
              />
            )
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
  });
  