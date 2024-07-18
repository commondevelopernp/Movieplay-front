import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, List, Button, Text} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';
import {SearchRightIcon} from '../../components/MovieSearch/MovieSearchBar';
import {
  orderElements,
  ratesElements,
  sortByElements,
} from '../../store/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSearchQuery,
  setRate,
  setPage,
  setOrder,
  setSort,
} from '../../store/slices/movie/movieSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../store/store';
import {CommonActions} from '@react-navigation/native';
const MovieSearch = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {query, rate, order, sort} = useSelector(
    (state: RootState) => state.movie.searchParams,
  );
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const onChangeSearch = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));
  };

  const handleSelectOption1 = (option: string) => {
    dispatch(
      setRate(ratesElements.find(e => e.labelKey === option)?.value ?? ''),
    );
    setExpanded1(false);
  };

  const handleSelectOption2 = (option: string) => {
    dispatch(
      setOrder(orderElements.find(e => e.labelKey === option)?.value ?? ''),
    );
    setExpanded2(false);
  };

  const handleSelectOption3 = (option: string) => {
    dispatch(
      setSort(sortByElements.find(e => e.labelKey === option)?.value ?? ''),
    );
    setExpanded2(false);
  };

  const handleSearch = () => {
    dispatch(setPage(1)); // Reset to first page
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const onSubmitSearch = () => {
    handleSearch();
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('searchMovie')}
        placeholderTextColor={theme.colors.text}
        onChangeText={onChangeSearch}
        value={query}
        icon={() => null}
        right={SearchRightIcon}
        style={styles.searchbar}
        inputStyle={styles.input}
        onSubmitEditing={onSubmitSearch}
        returnKeyType="search"
      />
      <List.Section>
        <Text style={styles.label}>{t('rate')}</Text>
        <List.Accordion
          title={t(ratesElements.find(e => e.value === rate)?.labelKey ?? '')}
          expanded={expanded1}
          onPress={() => setExpanded1(!expanded1)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {ratesElements.map(opt => (
            <List.Item
              key={opt.value}
              title={t(opt.labelKey)}
              onPress={() => handleSelectOption1(opt.labelKey)}
              titleStyle={styles.listItem}
            />
          ))}
        </List.Accordion>
        <Text style={styles.label}>{t('sortBy')}</Text>
        <List.Accordion
          title={t(sortByElements.find(e => e.value === sort)?.labelKey ?? '')}
          expanded={expanded3}
          onPress={() => setExpanded3(!expanded3)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {sortByElements.map(opt => (
            <List.Item
              key={opt.value}
              title={t(opt.labelKey)}
              onPress={() => handleSelectOption3(opt.labelKey)}
              titleStyle={styles.listItem}
            />
          ))}
        </List.Accordion>
        <Text style={styles.label}>{t('releaseDateSort')}</Text>
        <List.Accordion
          title={t(orderElements.find(e => e.value === order)?.labelKey ?? '')}
          expanded={expanded2}
          onPress={() => setExpanded2(!expanded2)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {orderElements.map(opt => (
            <List.Item
              key={opt.value}
              title={t(opt.labelKey)}
              onPress={() => handleSelectOption2(opt.labelKey)}
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
