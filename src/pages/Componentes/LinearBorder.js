import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LinearBorder = ({ icon, placeholder, onChangeText, value, keyboardType }) => {
  return (
    <View style={styles.linearComp}>
      {icon && <MaterialIcons name={icon} size={24} color={'rgba(0, 0, 0, 0.5)'} />}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  linearComp: {
    borderWidth: 3,
    height: 45,
    width: 340,
    borderColor: 'rgba(255, 203, 210, 0.8)',
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    alignSelf: 'center',
  },
});

export default LinearBorder;
