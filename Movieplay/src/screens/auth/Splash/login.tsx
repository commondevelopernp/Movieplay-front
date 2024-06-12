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
import {RootStackNavigationParams} from '../../../navigation/RootNavigation';
import {useTranslation} from 'react-i18next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from '../../../store/slices/auth/authSlice';
import {useLoginMutation} from '../../../store/slices/auth/authApiSlice';

type Props = StackScreenProps<RootStackNavigationParams, 'Login'>;

const Login = ({navigation}: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google!');

      if (!idToken) {
        return;
      }
      // Send the OAuth token to your API and handle the response
      const response = await login({oauthToken: idToken}).unwrap();
      dispatch(setAccessToken(response.jwt));
      dispatch(setRefreshToken(response.refreshToken));
      dispatch(setUser(response.user));

      // Navigate to the next screen or perform any other actions
      //navigation.navigate('Home'); // Replace 'Home' with your desired screen
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Sign in is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Play services not available or outdated');
        } else {
          console.log('Some other error happened:', error);
        }
      } else {
        console.log('An unknown error occurred:', error);
      }
    }
  };

  return (
    <ImageBackground
      style={styles.imageBackground}
      source={require('../../../assets/Slash-background.png')}
      resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.text}>{t('appName')}</Text>
        <Text style={styles.bienvenido}>{t('welcome')}</Text>

        <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Image
            source={require('../../../assets/Login-Google.png')}
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
