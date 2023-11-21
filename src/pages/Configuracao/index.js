/*
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Navbar from '../Componentes/Navbar';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { push, set, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useUser  } from '../../services/UserContext/index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebaseConfigurations/firebaseConfig';
import { v4 as uuidv4 } from 'uuid'; // Importe a função v4 da biblioteca uuid

const ConfiguracaoTela = () => {
  const route = useRoute();
  const { userPhotoUrl, username: initialUsername } = route.params || {};
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState(initialUsername);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useUser();
  const userId = state.uid;
  const navigation = useNavigation();

  const getUserType = async () => {
    try {
      // Tente obter o userType do contexto do usuário
      let userType = state.userType;
  
      // Se o userType não estiver disponível no contexto do usuário, tente buscá-lo do Realtime Database
      if (!userType) {
        const userNodePath = `users/${userId}`;
        const userNodeRef = ref(db, userNodePath);
  
        // Adicione um ouvinte de eventos para obter os dados do usuário
        const onData = (snapshot) => {
          if (snapshot.exists()) {
            userType = snapshot.child('userType').val();
            console.log("userType:", userType);
          }
        };
  
        // Adicione o ouvinte de eventos
        onValue(userNodeRef, onData);
  
        // Remova o ouvinte após obter os dados para evitar vazamento de memória
        setTimeout(() => offValue(userNodeRef, onData), 5000); // Remova o ouvinte após 5 segundos
      }
  
      return userType;
    } catch (error) {
      console.error('Erro ao obter o userType:', error.message);
      throw error;
    }
  };
  
  
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };


  const handleSavePress = async () => {
    try {
      // Obter o userType do contexto do usuário, se disponível
      const userType = await getUserType();
  
      // Verificar se há uma nova imagem para ser atualizada
      if (imageUri) {
        // Substitua 'Imagens/Perfil/Usuarios' pelo seu caminho correto no Storage
        const pathToStorage = userType === 'Buffet' ? 'Imagens/Perfil/Buffet' : 'Imagens/Perfil/Cliente';
  
        // Selecione o caminho correto no Realtime Database
        const userNodePath = userType === 'Buffet' ? `buffets/${userId}` : `clientes/${userId}`;
  
        // Enviar a nova imagem para o storage
        const uniqueFileName = `${uuidv4()}.jpg`;
        const storageRef = ref(storage, `${pathToStorage}/${uniqueFileName}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
  
        // Obtenha a URL da imagem
        const imageUrl = await getDownloadURL(storageRef);
  
        // Atualize a URL da imagem no Realtime Database
        await set(ref(db, `${userNodePath}/imagem`), imageUrl);
  
        navigation.goBack();
      }
  
      // ...
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error.message);
    }
  };
  
  
  
  const handleEditNome = ()=>{
    setIsEditing(false);
  }



  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.containerFoto}>
        <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
          <View style={styles.overlayContainer}>
            <Image source={{ uri: imageUri || userPhotoUrl }} style={styles.imagemPerfil} />
            <View style={styles.cameraIconContainer}>
              <MaterialIcons name="photo-camera" size={30} color={'white'} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
          {isEditing ? (
            <TextInput
              style={styles.nomeUsuario}
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoFocus
            />
          ) : (
            <Text style={styles.nomeUsuario}>{username}</Text>
          )}
          {!isEditing && (
            <TouchableOpacity onPress={handleEditPress}>
              <MaterialIcons name="edit" size={24} color={'black'} />
            </TouchableOpacity>
          )}
          {isEditing && (
            <TouchableOpacity onPress={handleEditNome}>
              <MaterialIcons name="save" size={24} color={'black'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={handleSavePress}>
        <Text>Salavar alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerFoto: {
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'relative',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 18,
    right: 130,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 30,
  },
  imagemPerfil: {
    marginTop: 46,
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 22,
  },
  nomeUsuario: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default ConfiguracaoTela;
*/

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Navbar from '../Componentes/Navbar';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ref, push, set, get } from 'firebase/database';
import { db } from "../../services/firebaseConfigurations/firebaseConfig";
import { useUser  } from '../../services/UserContext/index';
import LinearButton from '../Componentes/LinearButton'


const ConfiguracaoTela = () => {
  const route = useRoute();
  const { userPhotoUrl, username: initialUsername } = route.params || {};
  const [imageUri, setImageUri] = useState(null);
  const [username, setUsername] = useState(initialUsername);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useUser();
  const userId = state.uid;
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };


  const handleSavePress = async () => {
    
  
    try {
      // Verificar se o ID existe em users
      const userSnapshot = await get(ref(db, `users/${userId}`));
      if (userSnapshot.exists()) {
        // Atualizar o nome de usuário para users
        await set(ref(db, `users/${userId}/nome`), username);
      }
  
      // Verificar se o ID existe em buffets
      const buffetSnapshot = await get(ref(db, `buffets/${userId}`));
      if (buffetSnapshot.exists()) {
        // Atualizar o nome de usuário para buffets
        await set(ref(db, `buffets/${userId}/nome`), username);
      }
  
      // Verificar se o ID existe em clientes
      const clienteSnapshot = await get(ref(db, `clientes/${userId}`));
      if (clienteSnapshot.exists()) {
        // Atualizar o nome de usuário para clientes
        await set(ref(db, `clientes/${userId}/nome`), username);
      }
  
      // Verificar se há uma nova imagem para ser atualizada
      if (imageUri) {
        // Enviar a nova imagem para o storage (substitua 'images' pelo seu caminho correto)
        const imageRef = ref(db, `images/${userId}`);
        await set(imageRef, imageUri);
  
        // Atualizar a URL da imagem para users
        if (userSnapshot.exists()) {
          const imageUrl = await get(imageRef);
          await set(ref(db, `users/${userId}/imagem`), imageUrl.val());
        }
  
        // Atualizar a URL da imagem para buffets
        if (buffetSnapshot.exists()) {
          const imageUrl = await get(imageRef);
          await set(ref(db, `buffets/${userId}/imagem`), imageUrl.val());
        }
  
        // Atualizar a URL da imagem para clientes
        if (clienteSnapshot.exists()) {
          const imageUrl = await get(imageRef);
          await set(ref(db, `clientes/${userId}/imagem`), imageUrl.val());
        }

        navigation.goBack()
      }
  
      console.log('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error.message);
    }
  };
  
  const handleEditNome = ()=>{
    setIsEditing(false);
  }



  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.containerFoto}>
        <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
          <View style={styles.overlayContainer}>
            <Image source={{ uri: imageUri || userPhotoUrl }} style={styles.imagemPerfil} />
            <View style={styles.cameraIconContainer}>
              <MaterialIcons name="photo-camera" size={30} color={'white'} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
          {isEditing ? (
            <TextInput
              style={styles.nomeUsuario}
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoFocus
            />
          ) : (
            <Text style={styles.nomeUsuario}>{username}</Text>
          )}
          {!isEditing && (
            <TouchableOpacity onPress={handleEditPress}>
              <MaterialIcons name="edit" size={24} color={'black'} />
            </TouchableOpacity>
          )}
          {isEditing && (
            <TouchableOpacity onPress={handleEditNome}>
              <MaterialIcons name="save" size={24} color={'black'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

<LinearButton title="Criar Funcionário" style={styles.LinearButton}>
        <TouchableOpacity onPress={handleSavePress}>
        <Text>Salavar alterações</Text>
      </TouchableOpacity>
</LinearButton>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerFoto: {
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'relative',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 18,
    right: 130,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 30,
  },
  imagemPerfil: {
    marginTop: 46,
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 22,
  },
  nomeUsuario: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  
  LinearButton:
  {
    bottom: 0
  }
});

export default ConfiguracaoTela;