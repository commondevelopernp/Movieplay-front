import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text} from 'react-native-paper';
import theme from '../../themes/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

type ErrorScreenProps = {
  open: boolean;
  setVisible: (visible: boolean) => void;
  errorType: 'internet' | 'server' | 'unknown';
};

type errorParams = {
  text: string;
  icon: React.ReactNode;
};

const getScreenProps = (
  errorType: string,
  t: TFunction<any, undefined>,
): errorParams => {
  switch (errorType) {
    case 'internet':
      return {
        text: t('noInternetConnection'),
        icon: <Icon name="wifi" size={100} color={theme.colors.primary} />,
      };
    case 'server':
      return {
        text: t('serverUnderMaintenance'),
        icon: (
          <Icon
            name="exclamation-triangle"
            size={100}
            color={theme.colors.primary}
          />
        ),
      };
    default:
      return {
        text: t('error'),
        icon: (
          <Icon
            name="exclamation-triangle"
            size={100}
            color={theme.colors.primary}
          />
        ),
      };
  }
};

const ErrorScreen = (props: ErrorScreenProps) => {
  const {open, setVisible, errorType} = props;

  const hideModal = () => {
    setVisible(false);
  };
  const {t} = useTranslation();

  const {text, icon} = getScreenProps(errorType, t);

  return (
    <Portal>
      <Modal visible={open} onDismiss={hideModal}>
        <View style={styles.container}>
          {icon}
          <Text style={styles.text}>{text}</Text>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'black',
    width: '95%',
    height: '70%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  text: {color: 'white', fontSize: 25, fontWeight: 'bold'},
  button: {backgroundColor: theme.colors.primary, width: '50%'},
});

export default ErrorScreen;
