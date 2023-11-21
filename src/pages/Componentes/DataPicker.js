import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o MaterialIcons
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = ({ onSelectDate, style }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (selectedDate) => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    // Pass the formatted selected date back to the parent component
    onSelectDate(formatDate(currentDate));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={[styles.datePickerContainer, style]}>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
        <MaterialIcons name="date-range" size={24} color="gray" />
        <Text style={styles.datePickerButtonText}>
          Data: {formatDate(date) || 'Selecionar Data'}
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

const styles = {
  datePickerButton: {

    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    borderRadius: 0,
    width: 170,
    elevation: 5,
    backgroundColor: 'white',
  },
  datePickerButtonText: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
};

export default DatePickerComponent;
