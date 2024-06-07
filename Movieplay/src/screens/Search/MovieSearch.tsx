import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, List, Button, Text} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';
import {SearchRightIcon} from '../../components/MovieSearch/MovieSearchBar';
import {ratesOptions, sortReleaseDateOptions} from '../../store/constants';

const MovieSearch = () => {
  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState('--');
  const [selectedOption2, setSelectedOption2] = useState('--');

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const handleSelectOption1 = (option: string) => {
    setSelectedOption1(option);
    setExpanded1(false);
  };

  const handleSelectOption2 = (option: string) => {
    setSelectedOption2(option);
    setExpanded2(false);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={t('searchMovie')}
        placeholderTextColor={theme.colors.text}
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={() => null}
        right={SearchRightIcon}
        style={styles.searchbar}
        inputStyle={styles.input}
      />
      <List.Section>
        <Text style={styles.label}>{t('rate')}</Text>
        <List.Accordion
          title={selectedOption1}
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
          title={selectedOption2}
          expanded={expanded2}
          onPress={() => setExpanded2(!expanded2)}
          titleStyle={styles.accordionTitle}
          style={styles.accordion}>
          {sortReleaseDateOptions.map(opt => (
            <List.Item
              key={opt}
              title={t(opt)}
              onPress={() => handleSelectOption2(t(opt))}
              titleStyle={styles.listItem}
            />
          ))}
        </List.Accordion>
      </List.Section>
      <Button
        mode="outlined"
        style={styles.actionButton}
        textColor={theme.colors.text}
        onPress={() => {
          /* Handle button press */
        }}>
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
