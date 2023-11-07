import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importe o MaterialIcons
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateText, setSelectedDateText] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Para iOS, sempre mostre o seletor de data
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
    <View style={{alignSelf: 'center'}}>
      <TouchableOpacity onPress={showDatepicker} >
        <View style={styles.datePickerButton}>
          <MaterialIcons name="date-range" size={24} color="gray" />
          <Text style={styles.datePickerButtonText}>
            Data: {selectedDateText || 'Selecionar Data'}
          </Text>
        </View>
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
