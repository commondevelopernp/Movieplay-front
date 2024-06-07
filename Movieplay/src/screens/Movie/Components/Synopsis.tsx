import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface SynopsisProps {
  text: string;
}

const Synopsis: React.FC<SynopsisProps> = ({text}) => {
  return <Text style={styles.synopsis}>{text}</Text>;
};

const styles = StyleSheet.create({
  synopsis: {
    marginVertical: 10,
    color: '#ffffff',
  },
});

export default Synopsis;
