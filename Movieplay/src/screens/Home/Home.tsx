import React from 'react';
import MovieSearchBar from '../../components/MovieSearch/MovieSearchBar';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import BackgroundImageWrapper from '../../components/backgroundWrapper/BackgroundWrapper';
import {genreElements} from '../../store/constants';
import GenreFilterButton from '../../components/GenreButton/GenreButton';
import movies from '../../components/MovieCard/MoviesMockData';
import MovieCard from '../../components/MovieCard/MovieCard';

type Props = StackScreenProps<HomeStackNavigationParams, 'Home'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = ({navigation}: Props) => {
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
            data={movies}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={item => item.id}
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
