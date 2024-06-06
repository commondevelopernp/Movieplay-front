import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Genre from './Genre';
import Ratings from './Ratings';
import Actions from './Actions';
import Synopsis from './Synopsis';
import TechnicalInfo from './TechnicalInfo';

const MovieCard: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.movieCard}>
        <Image
          style={styles.moviePoster}
          source={require('../../assets/spiderman.jpg')}
        />

        <View style={styles.movieDetails}>
          <Text style={styles.title}>Spider-Man No Way Home</Text>
          <Genre genre="Ciencia Ficción" />
          <Ratings rating={5} />
          <Actions />
          <Image
            style={styles.imageBackground}
            source={require('../../assets/background-movie.png')}
            resizeMode="cover"
          />
          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Synopsis
            text=" Después de que Quentin Beck incriminara a Peter Parker por su asesinato y de paso revelar la identidad de este como Spider-Man ante los medios de comunicación, el mismo Parker, su novia Michelle «MJ» Jones-Watson, su mejor amigo Ned Leeds y la tía May son inmediatamente arrestados e ​​interrogados por el Departamento de Control de Daños. Afortunadamente, el abogado Matt Murdock consigue hacer que se le retiren los cargos a los Parker y sus amigos, pero ahora el grupo debe empezar a lidiar con toda la publicidad negativa provocada por Beck

"
          />
          <Text style={styles.sectionTitle}>Información técnica</Text>
          <TechnicalInfo year={2021} duration={148} ratings={21} />
        </View>
      </View>
    </ScrollView>
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

export default MovieCard;
