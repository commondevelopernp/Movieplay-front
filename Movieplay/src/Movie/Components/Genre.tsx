import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface GenreProps {
  genre: string;
}

const Genre: React.FC<GenreProps> = ({genre}) => {
  return <Text style={styles.genre}>GÉNERO: {genre}</Text>;
};

const styles = StyleSheet.create({
  genre: {
    fontStyle: 'italic',
    color: '#ffffff',
  },
});

export default Genre;
