import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useUser  } from '../../services/UserContext/index'; // Supondo que você tenha um contexto para o usuário

const MenuLateral = ({ isVisible, onClose }) => {
  const { state } = useUser(); // Obtenha o estado do usuário
  const username = state.username;
  if (!isVisible) {
    return null;
  }

  return (
    <Animatable.View
    animation="fadeIn"
    duration={500} // Ajuste a duração da animação conforme necessário
    style={styles.menuContainer}
  >

<View style={styles.ButtonContainer}>
<TouchableOpacity onPress={onClose}><Feather name="menu" size={24} left={'80%'} marginTop={'5%'} color="black" />
      </TouchableOpacity>
</View>
<View style={styles.HeaderContainer}>
<View style={styles.header}>
        <Image source={require('../../../assets/FrameLogo.png')} style={styles.logo} />
        <Image source={require('../../../assets/Buffley.png')} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.usernamearroba}>@{username}</Text>
      </View>
</View>
<View style={styles.NavigationContainer}>
<View style={styles.navigation}>
        {/* Adicione opções de navegação aqui */}
        <TouchableOpacity>
          <Text style={styles.navText}><Feather  style={styles.Icon} name="home" size={24} />home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}><Feather  style={styles.Icon} name="coffee" size={24} />Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}><Feather  style={styles.Icon} name="star" size={24} />Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}><Feather  style={styles.Icon} name="edit" size={24} />Curriculo</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}><Feather  style={styles.Icon} name="settings" size={24} />Configurações</Text>
        </TouchableOpacity>

      </View>
      </View>
      





    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%', // Ocupa 50% da largura da tela
    height: '100%',
    backgroundColor: '#318051', // Cor de fundo verde
    padding: 16,
    zIndex: 1,
    borderBottomLeftRadius: 50
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
    alignItems:'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: 80,
    marginVertical: '5%'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color:'white'
  },
  usernamearroba:
  {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color:'white'
  },
  navText:
  {
    marginVertical: '10%'
  },
  Icon:
  {
    color:"black"
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
});

export default MenuLateral;
