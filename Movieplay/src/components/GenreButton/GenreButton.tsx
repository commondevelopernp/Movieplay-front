import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';
import {setGenre, setPage} from '../../store/slices/movie/movieSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useGetMoviesQuery} from '../../store/slices/movie/movieApiSlice';
import {RootState} from '../../store/store';

type GenreFilterButtonProps = {
  value: string;
  label: string;
  onFilterStart: () => void;
};

const GenreFilterButton = (props: GenreFilterButtonProps) => {
  const {value, label, onFilterStart} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {refetch} = useGetMoviesQuery({});
  
  const currentGenre = useSelector((state: RootState) => state.movie.searchParams.genre);

  const handlePress = () => {
    onFilterStart(); // Notify parent component that filtering is starting
    const newGenre = currentGenre === value ? '' : value;
    dispatch(setGenre(newGenre));
    dispatch(setPage(1));
    refetch();
  };

  const isActive = currentGenre === value;

  return (
    <Button
      mode="outlined"
      style={[
        styles.button,
        isActive && styles.activeButton
      ]}
      textColor={isActive ? theme.colors.background : theme.colors.text}
      uppercase
      onPress={handlePress}>
      {t(label)}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: theme.colors.primary,
    margin: 5,
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
  },
});

export default GenreFilterButton;