import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import GenreLabel from './Components/GenreLabel';
import Ratings from './Components/Ratings';
import Actions from './Components/Actions';
import Synopsis from './Components/Synopsis';
import TechnicalInfo from './Components/TechnicalInfo';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';

type Props = StackScreenProps<HomeStackNavigationParams, 'Movie'>;

const MovieScreen = ({route}: Props) => {
  const {movie} = route.params;
  const {t} = useTranslation();
  return (
    <BackgroundImageWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.movieCard}>
          <Image style={styles.moviePoster} source={{uri: movie.images[0]}} />
          <View style={styles.movieDetails}>
            <Text style={styles.title}>{movie.title}</Text>
            <GenreLabel genre={movie.genre} />
            <Ratings rating={movie.rating} />
            <Actions />
            <Image
              style={styles.imageBackground}
              source={require('../../assets/background-movie.png')}
              resizeMode="cover"
            />
            <Text style={styles.sectionTitle}>{t('synopsis')}</Text>
            <Synopsis text={movie.synopsis} />
            <Text style={styles.sectionTitle}>{t('technicalInformation')}</Text>
            <TechnicalInfo year={2021} duration={148} ratings={21} />
          </View>
        </View>
      </ScrollView>
    </BackgroundImageWrapper>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '80%',
    marginBottom: '-10%',
    marginLeft: '-15%',
    opacity: 0.7,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 0,
  },
  movieCard: {
    backgroundColor: '#1c1c1c',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    marginVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  moviePoster: {
    width: '100%',
    height: 300,
  },
  movieDetails: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  ratingsActionsContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default MovieScreen;
