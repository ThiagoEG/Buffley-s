import React, { useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { Picker } from '@react-native-picker/picker';


const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState("opcao1");

  return (
    <View  style={[styles.ContainerDrop]}>

      <Picker
        selectedValue={selectedValue}
        style={{ 
            borderRadius: 5,
            height: 40,
            width: 150, 
            elevation: 5, 
            backgroundColor: 'white',
         }}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedValue(itemValue)
        }
      >
        <Picker.Item label="150 pessoas" value="150" />
        <Picker.Item label="200 pessoas" value="200" />
        <Picker.Item label="100 pessoas" value="100" />
      </Picker>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
    ContainerDrop: {
    },
  });
  