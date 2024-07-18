import React from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import theme from '../../themes/theme';
import {RootState} from '../../store/store';
import {setSearchQuery} from '../../store/slices/movie/movieSlice';

type FilterIconButtonProps = {
  onPress: () => void;
};

export const SearchRightIcon = () => (
  <IconButton icon="magnify" iconColor={theme.colors.text} />
);

const FilterIconButton = ({onPress}: FilterIconButtonProps) => {
  return <IconButton icon="filter" onPress={onPress} />;
};

type NavigationProp = StackNavigationProp<HomeStackNavigationParams, 'Home'>;

const MovieSearchBar = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  // On Reducer...
  const movieQueryStr = useSelector(
    (state: RootState) => state.movie.searchParams.query,
  );

  const onChangeSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleFilterPress = () => {
    navigation.navigate('Search');
  };

  return (
    <View>
      <Searchbar
        placeholder={t('searchMovie')}
        placeholderTextColor={theme.colors.text}
        value={movieQueryStr}
        onChangeText={onChangeSearch}
        onBlur={() => Keyboard.dismiss()}
        icon={() => null}
        // eslint-disable-next-line react/no-unstable-nested-components
        right={() => <FilterIconButton onPress={handleFilterPress} />}
        style={styles.searchbar}
        inputStyle={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    color: theme.colors.text,
  },
});

export default MovieSearchBar;
