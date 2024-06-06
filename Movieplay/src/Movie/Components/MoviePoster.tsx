import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface MoviePosterProps {
  src: string;
  alt: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({src, alt}) => {
  return (
    <Image
      source={require('../../assets/spiderman.jpg')}
      style={styles.moviePoster}
      resizeMode="contain"
      alt={alt}
    />
  );
};

const styles = StyleSheet.create({
  moviePoster: {
    width: '100%',
    height: 200,
  },
});

export default MoviePoster;
