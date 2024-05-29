import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const ProfileInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa" // Adjust placeholder color
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    padding: 10,
    backgroundColor: '#444', // Adjust input background color
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666', // Adjust border color
    color: '#fff',
  },
});

export default ProfileInput;
