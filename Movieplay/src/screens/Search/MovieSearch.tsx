import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, List, Button, Text} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';
import {SearchRightIcon} from '../../components/MovieSearch/MovieSearchBar';
import {ratesOptions, sortReleaseDateOptions} from '../../store/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSearchQuery,
  setRate,
  setReleaseDateSort,
  setPage,
} from '../../store/slices/movie/movieSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/store';

const MovieSearch = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {query, rate, releaseDateSort} = useSelector(
    (state: RootState) => state.movie.searchParams,
  );
  const [localQuery, setLocalQuery] = useState(query);
  const [localRate, setLocalRate] = useState(rate);
  const [localReleaseDateSort, setLocalReleaseDateSort] =
    useState(releaseDateSort);
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const onChangeSearch = (newQuery: string) => {
    setLocalQuery(newQuery);
  };

  const handleSelectOption1 = (option: string) => {
    setLocalRate(option);
    setExpanded1(false);
  };

  const handleSelectOption2 = (option: string) => {
    setLocalReleaseDateSort(option);
    setExpanded2(false);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(localQuery));
    dispatch(setRate(localRate));
    dispatch(setReleaseDateSort(localReleaseDateSort));
    dispatch(setPage(1)); // Reset to first page
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('searchMovie')}
        placeholderTextColor={theme.colors.text}
        onChangeText={onChangeSearch}
        value={localQuery}
        icon={() => null}
        right={SearchRightIcon}
        style={styles.searchbar}
        inputStyle={styles.input}
      />
      <List.Section>
        <Text style={styles.label}>{t('rate')}</Text>
        <List.Accordion
          title={localRate}
          expanded={expanded1}
          onPress={() => setExpanded1(!expanded1)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {ratesOptions.map(opt => (
            <List.Item
              key={opt}
              title={opt}
              onPress={() => handleSelectOption1(opt)}
              titleStyle={styles.listItem}
            />
          ))}
        </List.Accordion>
        <Text style={styles.label}>{t('releaseDateSort')}</Text>
        <List.Accordion
          title={localReleaseDateSort}
          expanded={expanded2}
          onPress={() => setExpanded2(!expanded2)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {sortReleaseDateOptions.map(opt => (
            <List.Item
              key={opt}
              title={t(opt)}
              onPress={() => handleSelectOption2(opt)}
              titleStyle={styles.listItem}
            />
          ))}
        </List.Accordion>
      </List.Section>
      <Button
        mode="outlined"
        style={styles.actionButton}
        textColor={theme.colors.text}
        onPress={handleSearch}>
        {t('search').toUpperCase()}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    marginVertical: 10,
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
  customInput: {
    color: theme.colors.text,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  label: {
    color: theme.colors.text,
    marginVertical: 10,
  },
  accordionTitle: {
    color: theme.colors.primary,
  },
  listItem: {
    color: theme.colors.primary,
  },
  accordion: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  actionButton: {
    marginTop: 200,
    borderColor: theme.colors.primary,
  },
});

export default MovieSearch;
