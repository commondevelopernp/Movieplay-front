import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {
  NavigationProp,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';

import MovieSearchBar from '../../components/MovieSearch/MovieSearchBar';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import GenreFilterButton from '../../components/GenreButton/GenreButton';
import MovieCard from '../../components/MovieCard/MovieCard';
import Loading from '../../components/Loading/Loading';
import {RootState} from '../../store/store';
import {useGetMoviesQuery} from '../../store/slices/movie/movieApiSlice';
import {
  setPage,
  setPage as setPageAction,
  setRate,
  setReleaseDateSort,
  setSearchQuery,
} from '../../store/slices/movie/movieSlice';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import {RootStackNavigationParams} from '../../navigation/RootNavigation';
import {genreElements} from '../../store/constants';
import {selectMovieState} from '../../store/slices/movie/movieSlice';
import {IMovie} from '../../store/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { setUserId } from '../../store/slices/user/userSlice';

type Props = StackScreenProps<HomeStackNavigationParams, 'Home'>;

const Home = ({navigation}: Props) => {
  const navigationObj =
    useNavigation<NavigationProp<RootStackNavigationParams>>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.jwt !== null);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const movieState = useSelector(selectMovieState);
  const {query, genre, sort, order, pageSize, page} = movieState.searchParams;
  const {data, error, isLoading} = useGetMoviesQuery({
    genre,
    title: query,
    sort,
    order,
    page,
    pageSize,
  });
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [previousResults, setPreviousResults] = useState<IMovie[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [localQuery, setLocalQuery] = useState('');


  useEffect(() => {
    if (!isLoggedIn) {
      navigationObj.navigate('Login');
    }
  }, [isLoggedIn, navigationObj]);
/*useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        if (decodedToken.id){
            dispatch(setUserId(decodedToken.id));}
      } catch (error) {
        console.error('Failed to fetch the token from storage:', error);
      }
    };
    fetchToken();
  }, [isLoggedIn]);*/

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        if (page === 1) {
          setPreviousResults(searchResults);
          setSearchResults(data);
        } else {
          setSearchResults(prevResults => {
            const newResults = [...prevResults, ...data];
            return Array.from(new Set(newResults.map(m => m.id))).map(id =>
              newResults.find(m => m.id === id),
            ) as IMovie[];
          });
        }
        setIsFiltering(false);
        setIsInitialLoading(false);
      }, 100);
    }
  }, [data, page]);

  useFocusEffect(
    useCallback(() => {
      setLocalQuery('');
    }, []),
  );

  const handleMoviePress = useCallback(
    (movie: IMovie) => {
      navigation.navigate('Movie', {movie});
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (!isLoading) {
      dispatch(setPageAction(page + 1));
    }
  }, [dispatch, isLoading, page]);

  const renderMovieItem = useCallback(
    ({item}: {item: IMovie}) => (
      <TouchableOpacity onPress={() => handleMoviePress(item)}>
        <MovieCard movie={item} />
      </TouchableOpacity>
    ),
    [handleMoviePress],
  );

  const keyExtractor = useCallback((item: IMovie) => item.id.toString(), []);

  const handleFilterStart = useCallback(() => {
    setIsFiltering(true);
  }, []);
  const handleSearch = query => {
    dispatch(setSearchQuery(query));
    dispatch(setRate(localRate));
    dispatch(setReleaseDateSort(localReleaseDateSort));
    dispatch(setPage(1));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };
  const renderContent = () => {
    if (
      isInitialLoading ||
      (isLoading &&
        searchResults.length === 0 &&
        previousResults.length === 0) ||
      isFiltering
    ) {
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

    if (
      !isLoading &&
      searchResults.length === 0 &&
      previousResults.length === 0
    ) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.text}>{t('noResults')}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={searchResults.length > 0 ? searchResults : previousResults}
        keyExtractor={keyExtractor}
        renderItem={renderMovieItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loadingMoreContainer}>
              <Loading size={'small'} />
            </View>
          ) : null
        }
      />
    );
  };

  return (
    <BackgroundImageWrapper>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.searchBarContainer}>
            <MovieSearchBar
              resetQuery={() => setLocalQuery('')}
              onSubmitSearch={() => handleSearch(localQuery)}
            />
          </View>
          <View style={styles.genreContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {genreElements.map(genreItem => (
                <GenreFilterButton
                  key={genreItem.value}
                  value={genreItem.value}
                  label={genreItem.labelKey}
                  onFilterStart={handleFilterStart}
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
    alignItems: 'center',
  },
  loadMoreButton: {
    marginVertical: 10,
  },
});

export default Home;
