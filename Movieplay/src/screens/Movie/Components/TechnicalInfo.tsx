import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';

interface TechnicalInfoProps {
  year: number;
  duration: number;
  ratings: number;
}

const TechnicalInfo: React.FC<TechnicalInfoProps> = ({
  year,
  duration,
  ratings,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.technicalInfo}>
      <Text style={styles.text}>{`${t('year')}: ${year}`}</Text>
      <Text style={styles.text}>{`${t('duration')}: ${duration} ${t(
        'minutes',
      )}`}</Text>
      <Text style={styles.text}>{`${t('rates')}: ${ratings}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  technicalInfo: {
    marginVertical: 5,
  },
  text: {
    color: '#ffffff',
  },
});

export default TechnicalInfo;
