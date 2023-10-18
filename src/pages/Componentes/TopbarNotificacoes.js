import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TopBar = ({ onChangeTab }) => {
  const [selectedTab, setSelectedTab] = useState('General');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    onChangeTab(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleTabChange('General')}
        style={[styles.tab, { borderBottomWidth: selectedTab === 'General' ? 2 : 0 }]}>
        <Text style={styles.tabText}>General</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTabChange('Recommended')}
        style={[styles.tab, { borderBottomWidth: selectedTab === 'Recommended' ? 2 : 0 }]}>
        <Text style={styles.tabText}>Recommended</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: '#104A51', // Cor da linha
  },
  tabText: {
    color: 'black',
  },
});

export default TopBar;
