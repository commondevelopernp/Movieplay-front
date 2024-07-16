import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, Button } from 'react-native-paper'; // Asegúrate de importar Button de 'react-native-paper'
import { NavigationProp, useNavigation } from '@react-navigation/native';

import MovieSearchBar from '../../components/MovieSearch/MovieSearchBar';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import GenreFilterButton from '../../components/GenreButton/GenreButton';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';
import { RootState } from '../../store/store';
import {
  useGetMoviesQuery,
  setPage as setPageAction,
} from '../../store/slices/movie/movieApiSlice';
import { HomeStackNavigationParams } from '../../navigation/HomeStackNavigator';
import { RootStackNavigationParams } from '../../navigation/RootNavigation';
import { genreElements } from '../../store/constants';
import { selectMovieState } from '../../store/slices/movie/movieSlice';
import { IMovie } from '../../store/types';

type Props = StackScreenProps<HomeStackNavigationParams, 'Home'>;

const Home = ({ navigation }: Props) => {
  const navigationObj = useNavigation<NavigationProp<RootStackNavigationParams>>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.jwt !== null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const movieState = useSelector(selectMovieState);
  const { query, genre, sort, order, pageSize } = movieState.searchParams;
  const { data, error, isLoading, refetch } = useGetMoviesQuery({
    genre,
    title: query,
    sort,
    order,
    page: 1,
    pageSize,
  });

  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigationObj.navigate('Login');
    }
  }, [isLoggedIn, navigationObj]);

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  useEffect(() => {
    refetch({ page: 1 });
  }, [query, genre, sort, order, pageSize, refetch]);

  const handleMoviePress = (movie: IMovie) => {
    navigation.navigate('Movie', { movie });
  };

  const handleLoadMore = () => {
    dispatch(setPageAction(movieState.searchParams.page + 1)); // Incrementar la página
  };

  const renderContent = () => {
    if (isLoading && movieState.searchParams.page === 1) {
      return (
        <View style={styles.loadingContainer}>
          <Loading size={'large'} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.text}>{t('error')}</Text>
        </View>
      );
    }

    if (!movies || movies.length === 0) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.text}>{t('noResults')}</Text>
        </View>
      );
    }

    return (
      <>
        <FlatList
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleMoviePress(item)}>
              <MovieCard movie={item} />
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading && movieState.searchParams.page > 1 ? (
              <View style={styles.loadingMoreContainer}>
                <Loading size={'small'} />
              </View>
            ) : null
          }
        />
        {isLoading || movies.length % pageSize !== 0 ? null : (
          <Button
            mode="outlined"
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
          >
            {t('loadMore').toUpperCase()}
          </Button>
        )}
      </>
    );
  };

  return (
    <BackgroundImageWrapper>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.searchBarContainer}>
            <MovieSearchBar />
          </View>
          <View style={styles.genreContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {genreElements.map(genreItem => (
                <GenreFilterButton
                  key={genreItem.value}
                  value={genreItem.value}
                  label={genreItem.labelKey}
                />
              ))}
            </ScrollView>
          </View>
          {renderContent()}
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
  loadingContainer: {
    alignSelf: 'center',
    marginTop: 250,
  },
  messageContainer: {
    alignSelf: 'center',
    marginTop: 270,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  genreContainer: {
    zIndex: 2,
  },
  mainScreen: {
    width: '100%',
    marginBottom: 200,
  },
  loadingMoreContainer: {
    paddingVertical: 20,
  },
  loadMoreButton: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default Home;
