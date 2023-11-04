import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({ setImageUri }) {
  const [imageUri, setImage] = useState(null); // Alterei o nome da variável para 'setImage'

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri); // Aqui também alterei para 'setImage'

      if (setImageUri) {
        setImageUri(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={{height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 12, paddingHorizontal: 20, }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            fontWeight: "200",
          }}
        >
          Selecionar Imagem
        </Text>
        <TouchableOpacity onPress={pickImage}>
          <MaterialIcons name="folder" size={35} />
        </TouchableOpacity>
      </View>
      {imageUri && (
        <Text style={{ fontSize: 16, marginTop: 8 }}>
          URL da imagem selecionada: {imageUri}
        </Text>
      )}
    </View>
  );
}
