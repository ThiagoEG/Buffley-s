// Componente Notificacao
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Notification = ({ userImage, text, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: userImage }} style={styles.userImage} />
      </View>
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
      <View style={styles.childrenContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
//    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  childrenContainer: {
    marginLeft: 10,
  },
});

export default Notification;
