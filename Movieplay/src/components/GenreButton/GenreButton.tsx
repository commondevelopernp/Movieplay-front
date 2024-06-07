import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import theme from '../../themes/theme';
import {useTranslation} from 'react-i18next';

type GenreFilterButtonProps = {
  value: string;
  label: string;
};

const GenreFilterButton = (props: GenreFilterButtonProps) => {
  const {value, label} = props;
  const {t} = useTranslation();

  return (
    <Button
      mode="outlined"
      style={styles.button}
      textColor={theme.colors.text}
      uppercase
      onPress={() => {
        console.log(value);
      }}>
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
