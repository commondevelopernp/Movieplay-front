import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface RatingsProps {
  rating: number;
}

const Ratings: React.FC<RatingsProps> = ({rating}) => {
  return <Text style={styles.ratings}>{'⭐️'.repeat(rating)}</Text>;
};

const styles = StyleSheet.create({
  ratings: {
    fontSize: 18,
    color: '#ffd700',
  },
});

export default Ratings;
