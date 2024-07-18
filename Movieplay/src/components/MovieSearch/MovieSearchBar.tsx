import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {HomeStackNavigationParams} from '../../navigation/HomeStackNavigator';
import theme from '../../themes/theme';
import {RootState} from '../../store/store';

export const SearchRightIcon = () => (
  <IconButton icon="magnify" iconColor={theme.colors.text} />
);

type NavigationProp = StackNavigationProp<HomeStackNavigationParams, 'Home'>;

const MovieSearchBar = ({resetQuery, ...props}) => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const movieQueryStr = useSelector(
    (state: RootState) => state.movie.searchParams.query,
  );

  const handleReset = () => {
    if (resetQuery) {
      resetQuery();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Searchbar
          placeholder={t('searchMovie')}
          placeholderTextColor={theme.colors.text}
          value={movieQueryStr}
          editable={false}
          icon={() => null}
          right={SearchRightIcon}
          style={styles.searchbar}
          inputStyle={styles.input}
        />
      </TouchableOpacity>
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
