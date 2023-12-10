import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
<Image style={styles.image} source={require('../../assets/LogoAtualizada.png')}></Image>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text>Carregando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: '10%',
    width: '100%',
    height: '50%',
    alignSelf: 'center',
  },
});

export default LoadingScreen;
