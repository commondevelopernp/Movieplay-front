import React from 'react';
import MovieSearchBar from '../../components/MovieSearch/MovieSearchBar';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import {genreElements} from '../../store/constants';
import GenreFilterButton from '../../components/GenreButton/GenreButton';
import MovieCard from '../../components/MovieCard/MovieCard';
import {IMovie} from '../../store/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

type Props = StackScreenProps<HomeStackNavigationParams, 'Home'>;

const Home = ({navigation}: Props) => {
  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('Movie', {movie});
  };

  //const {data, error, isLoading} = useGetMoviesQuery({}); //Prepare queries to be used.
  const moviesFromState = useSelector((state: RootState) => state.movie.movies);
  return (
    <BackgroundImageWrapper>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.searchBarContainer}>
            <MovieSearchBar />
          </View>
          <View style={styles.genreContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {genreElements.map((genre, index) => {
                return (
                  <GenreFilterButton
                    key={index}
                    value={genre.value}
                    label={genre.labelKey}
                  />
                );
              })}
            </ScrollView>
          </View>
          <FlatList
            data={moviesFromState}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleMoviePress(item)}>
                <MovieCard movie={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </BackgroundImageWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 130,
  },
  topContainer: {},
  searchBarContainer: {
    padding: 15,
  },
  genreContainer: {zIndex: 2},
  mainScreen: {
    //flex: 1,
    width: '100%',
    marginBottom: 200,
  },
});

export default Home;
