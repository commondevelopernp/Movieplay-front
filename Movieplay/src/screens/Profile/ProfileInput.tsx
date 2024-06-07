import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface ProfileInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
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
        placeholderTextColor="#aaa"
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
    backgroundColor: '#fff', // Change background to white
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666',
    color: '#000', // Change text color to black for readability
  },
});

export default ProfileInput;
