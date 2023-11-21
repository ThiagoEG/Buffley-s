import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Notification = ({ userImage, text }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <Text style={styles.notificationText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    margin: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Define uma borda circular
    marginRight: 10,
  },
  notificationText: {
    flex: 1, // Permite que o texto ocupe todo o espaço restante na linha
    color: 'black',
  },
});

export default Notification;
