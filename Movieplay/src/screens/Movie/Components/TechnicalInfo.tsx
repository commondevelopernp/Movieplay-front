import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TechnicalInfoProps {
  year: number;
  duration: number;
  ratings: number;
}

const TechnicalInfo: React.FC<TechnicalInfoProps> = ({
  year,
  duration,
  ratings,
}) => {
  return (
    <View style={styles.technicalInfo}>
      <Text style={styles.text}>Año: {year}</Text>
      <Text style={styles.text}>Duración: {duration} min.</Text>
      <Text style={styles.text}>Calificaciones: {ratings}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  technicalInfo: {
    marginVertical: 5,
  },
  text: {
    color: '#ffffff',
  },
});

export default TechnicalInfo;
