import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import YouTube from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import GenreLabel from './Components/GenreLabel';
import RatingsAndActions from './Components/RatingsAndActions';
import Synopsis from './Components/Synopsis';
import TechnicalInfo from './Components/TechnicalInfo';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';

type Props = StackScreenProps<HomeStackNavigationParams, 'Movie'>;

const getYouTubeVideoId = (url: string | undefined) => {
  if (!url) return null;

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?v=))([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

const MovieScreen = ({route}: Props) => {
  const {movie} = route.params;
  const {t} = useTranslation();
  const [showTrailer, setShowTrailer] = useState(false);
  const {width, height} = useWindowDimensions();
  const orientation = width > height ? 'landscape' : 'portrait';
  const youtubeRef = useRef<any>(null); // Uso 'any' para evitar problemas de tipo con useRef

  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };

  const videoId = getYouTubeVideoId(movie.trailerVideoUrl);

  return (
    <BackgroundImageWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.movieCard}>
          <View style={styles.movieHeader}>
            {!showTrailer && (
              <Image
                style={styles.moviePoster}
                source={{uri: movie.images[0]}}
              />
            )}
          </View>
          {showTrailer && videoId && (
            <View
              style={[
                styles.videoContainer,
                orientation === 'landscape' && styles.videoLandscape,
              ]}>
              <YouTube
                ref={youtubeRef}
                videoId={videoId}
                height={orientation === 'portrait' ? 200 : height}
                play={true}
                controls={true}
                fullscreen={showTrailer}
                onChangeFullscreen={(e: {isFullscreen: boolean}) => {
                  if (!e.isFullscreen) {
                    setShowTrailer(false);
                  }
                }}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
          <Button
            title={showTrailer ? t('showPhotos') : t('watchTrailer')}
            onPress={toggleTrailer}
          />
          <View style={styles.movieDetails}>
            <Text style={styles.title}>{movie.title}</Text>
            <GenreLabel genre={movie.genre.join(', ')} />

            <RatingsAndActions
              movieId={movie.id}
              rating={movie.rating}
              movieTitle={movie.title}
              movieSynopsis={movie.synopsis}
            />

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
  movieHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moviePoster: {
    width: '70%',
    height: 300,
  },
  videoContainer: {
    width: '100%',
    height: '30%',
    zIndex: 9999999999999999999999999999999,
  },
  videoLandscape: {
    marginTop: -100, // Aplicar margen superior negativo solo en orientación horizontal
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
  sectionTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 15,
  },
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
});

export default MovieScreen;
