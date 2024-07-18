/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import MovieSearchBar from '../../components/MovieSearch/MovieSearchBar';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
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
import {TabNavigatorParams} from '../../navigation/TabNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {useAddFavoriteMovieMutation} from '../../store/slices/movie/movieApiSlice';

type FavoritesNavigationProp = CompositeNavigationProp<
  BottomTabScreenProps<TabNavigatorParams, 'Favorites'>['navigation'],
  StackNavigationProp<HomeStackNavigationParams>
>;

type Props = {
  navigation: FavoritesNavigationProp;
};

const Favorites = ({navigation}: Props) => {
  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('Movie', {movie});
  };

  //const {data, error, isLoading} = useGetMoviesQuery({}); //Prepare queries to be used.
  const moviesFromState = useSelector((state: RootState) => state.movie.movies);
  const [id, setUserId] = useState(-1);
  const {data} = useAddFavoriteMovieMutation({id});

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Failed to fetch the token from storage:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

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
            data={data}
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

export default Favorites;
