import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useUser } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário
import { ref, get } from 'firebase/database'; // Importações específicas para o Realtime Database
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';


const MenuLateral = ({ isVisible, onClose }) => {
  const { state } = useUser(); // Obtenha o estado do usuário
  const [userPhotoUrl, setUserPhotoUrl] = useState('');
  const username = state.username;
  const [reloadData, setReloadData] = useState(true);

  const handlePress = () => {
    navigation.navigate('FavoritosCliente');
  };
  const navigation = useNavigation();



  useEffect(() => {
    if (state.uid) {
      const userUid = state.uid;
      const databaseRef = ref(db, `users/${userUid}/imagem`);

      get(databaseRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const photoUrl = snapshot.val();
            setUserPhotoUrl(photoUrl);
          }
        })
        .finally(() => {
          setReloadData(false); // Define reloadData como false após o carregamento
        });
    }
  }, [state.uid, reloadData]);


  const handleConfiguraçao = () => {
    navigation.navigate("ConfiguracaoTela", { userPhotoUrl, username });
  }


  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      
    <BlurView intensity={300} style={styles.blur}/ >
      
    <Animatable.View
      animation="fadeIn"
      duration={500} // Ajuste a duração da animação conforme necessário
      style={styles.menuContainer}
    >

      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={onClose}><Feather name="menu" size={24} left={'77%'} marginTop={'5%'} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.HeaderContainer}>
        <View style={styles.header}>
          <Text style={styles.logo} >Buffley's</Text>
          <View style={styles.img}>
            <Image source={{ uri: userPhotoUrl }} style={styles.profileImage} />
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.usernamearroba}>@{username}</Text>
        </View>
      </View>
      <View style={styles.NavigationContainer}>
        <View style={styles.navigation}>
          <TouchableOpacity style={styles.sla} onPress={handlePress}>
            <Feather style={styles.Icon} name="star" size={24} />
            <Text style={styles.navText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sla} onPress={handleConfiguraçao}>
            <Feather style={styles.Icon} name="settings" size={24} />
            <Text style={styles.navText}>Configurações</Text>
          </TouchableOpacity>

        </View>
      </View>

    </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  menuContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%', // Ocupa 50% da largura da tela
    height: '100%',
    backgroundColor: '#AE2C4C', // Cor de fundo verde
    padding: 16,
    zIndex: 1,
    borderBottomLeftRadius: 50,
  },
  ButtonContainer:
  {
    flex: 0.05,
  },
  HeaderContainer:
  {
    flex: 0.4,
  },
  NavigationContainer:
  {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 32,
    color: 'white',
    marginTop:16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius:50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white'
  },
  usernamearroba:
  {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white'
  },
  navText:
  {
    marginVertical: '10%',
    fontSize: 18,
  },
  Icon:
  {
    color: "black"
  },
  navigation: {
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 8,
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
  sla: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default MenuLateral;
