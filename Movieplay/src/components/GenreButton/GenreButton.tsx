import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';
import {setGenre, setPage} from '../../store/slices/movie/movieSlice';
import {useDispatch} from 'react-redux';
import {useGetMoviesQuery} from '../../store/slices/movie/movieApiSlice';

type GenreFilterButtonProps = {
  value: string;
  label: string;
};

const GenreFilterButton = (props: GenreFilterButtonProps) => {
  const {value, label} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {refetch} = useGetMoviesQuery({});

  const handlePress = () => {
    dispatch(setGenre(value));
    dispatch(setPage(1)); // Reset to first page
    refetch(); // Trigger the API request with new genre
  };

  return (
    <Button
      mode="outlined"
      style={styles.button}
      textColor={theme.colors.text}
      uppercase
      onPress={handlePress}>
      {t(label)}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    //marginTop: 200,
    borderColor: theme.colors.primary,
    margin: 5,
  },
});

export default GenreFilterButton;
