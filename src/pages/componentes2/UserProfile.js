import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfile = ({ user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user.nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
