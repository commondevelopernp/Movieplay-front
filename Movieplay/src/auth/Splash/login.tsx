/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Text,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RootStackNavigationParams} from '../../navigation/RootNavigation';
import {useTranslation} from 'react-i18next';

type Props = StackScreenProps<RootStackNavigationParams, 'Login'>;

const Login = ({navigation}: Props) => {
  const {t} = useTranslation();
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../assets/Slash-background.png')}
      resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.text}>{t('appName')}</Text>
        <Text style={styles.bienvenido}>{t('welcome')}</Text>

        <TouchableOpacity style={styles.button}>
          <Image
            source={require('../../assets/Login-Google.png')}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },
  bienvenido: {
    fontSize: 50,
    color: '#6EB6EA',
  },
  button: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  buttonImage: {
    width: 200,
    height: 50,
  },
});
