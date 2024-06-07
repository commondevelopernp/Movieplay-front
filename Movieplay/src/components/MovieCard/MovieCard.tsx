import React from 'react';
import {IMovie} from '../../store/types';
import {Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import theme from '../../themes/theme';

type MovieCardProps = {
  movie: IMovie;
};

const MovieCard = (props: MovieCardProps) => {
  const {movie} = props;
  return (
    <Card style={styles.card}>
      <Card.Cover source={{uri: movie.images[0]}} />
      <Card.Content style={styles.CardContent}>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {movie.title}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  CardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default MovieCard;
