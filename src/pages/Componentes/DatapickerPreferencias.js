import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedDateText(formatDate(currentDate));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={{ alignSelf: 'center' }}>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
        <MaterialIcons name="date-range" size={24} color="gray" />
        <Text style={styles.datePickerButtonText}>
          Data: {selectedDateText || 'Selecionar Data'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerButton: {
    marginTop: '5%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 340,
    backgroundColor: 'white',
    borderColor: 'rgba(255, 203, 210, 0.8)',
    borderWidth: 3,
  },
  datePickerButtonText: {
    color: 'rgba(0, 0, 0, 0.7)',
    marginLeft: 10,
  },
});

export default DatePickerComponent;
