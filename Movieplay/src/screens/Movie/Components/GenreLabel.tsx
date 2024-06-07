import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, StyleSheet} from 'react-native';

interface GenreLabelProps {
  genre: string;
}

const GenreLabel: React.FC<GenreLabelProps> = ({genre}) => {
  const {t} = useTranslation();
  const genreLabelText = t('genre').toLocaleUpperCase();

  return <Text style={styles.genre}>{`${genreLabelText}: ${genre}`}</Text>;
};

const styles = StyleSheet.create({
  genre: {
    fontStyle: 'italic',
    color: '#ffffff',
  },
});

export default GenreLabel;
